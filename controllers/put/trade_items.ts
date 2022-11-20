import {Request, Response} from "express";
import survivors, {itemPoints} from "../../data_store";
import {Inventory} from "../../interfaces/survivor";

interface TradeItems {
    need: Inventory,
    exchange: Inventory
}

interface Trade {
    items: TradeItems
    from: string, //The survivor from which we want the requested items
    to: string //The survivor to which we want give the requested items
}

const tradeItems = (req: Request, res: Response) => {
    const trade: Trade = req.body
    const exchangeItem = trade.items.exchange.item.toLowerCase()
    const exchangeItemQuantity = trade.items.exchange.quantity
    const neededItem = trade.items.need.item.toLowerCase()
    const neededItemQuantity = trade.items.need.quantity

    //Fetching survivor indexes from db
    const toIndex = survivors.findIndex(obj => obj.name === trade.to)
    const fromIndex = survivors.findIndex(obj => obj.name === trade.from)

    //Fetching survivor inventory indexes from db
    const toInvIndex = survivors[toIndex].inventory.findIndex(obj => obj.item === exchangeItem)
    const fromInvIndex = survivors[fromIndex].inventory.findIndex(obj => obj.item === neededItem)

    //Checking if both survivors have enough supplies to be exchanged
    if(survivors[toIndex].inventory[toInvIndex].quantity < exchangeItemQuantity){
        res.status(401).json({
            msg: `${trade.to} does not have enough quantity of ${exchangeItem}`
        })
        return
    }
    if(survivors[fromIndex].inventory[fromInvIndex].quantity < neededItemQuantity){
        res.status(401).json({
            msg: `${trade.from} does not have enough quantity of ${neededItem}`
        })
        return
    }

    //Checking if points of exchange supplies are enough for the swap
    if (!pointsMatch(trade.items)) {
        res.status(403).json({
            msg: 'Trading points are not equal'
        })
        return
    }

    //Fetching inventory of `from` Survivor
    const trader = survivors.find(obj => obj.name === trade.from)
    //Fetching inventory of `to` Survivor
    const requester = survivors.find(obj => obj.name === trade.to)

    if ((!trader || !trader.inventory) || (!requester || !requester.inventory)) {
        res.status(404).json({
            msg: `Either ${trade.from} or ${trade.to} does not exist or their inventory is empty`
        })
        return
    }

    if(toInvIndex === -1 || fromInvIndex === -1){
        res.status(404).json({
            msg: `Items not found inside inventories`
        })
        return
    }

    //swap items (exchange -> from) & (need -> to)

    //first check if items already exist or do we have to create new ones
    const need = survivors[toIndex].inventory.findIndex(obj => obj.item === neededItem)
    const exchange = survivors[fromIndex].inventory.findIndex(obj => obj.item === exchangeItem)

    //If items do not exist within survivor, we create those
    if(need ===  -1){
        survivors[toIndex].inventory.push({
            item: trade.items.need.item,
            quantity: 0
        })
    }
    if(exchange === -1){
        survivors[fromIndex].inventory.push({
            item: trade.items.exchange.item,
            quantity: 0
        })
    }

    //Swapping of the items
    survivors[toIndex].inventory[survivors[toIndex].inventory.length - 1].quantity += neededItemQuantity
    survivors[toIndex].inventory[toInvIndex].quantity -= exchangeItemQuantity

    survivors[fromIndex].inventory[survivors[fromIndex].inventory.length - 1].quantity += exchangeItemQuantity
    survivors[fromIndex].inventory[fromInvIndex].quantity -= neededItemQuantity

    res.status(200).json({
        msg: `Trade complete`
    })
}

function pointsMatch(items: TradeItems) {
    let totalNeedPoints = itemPoints[items.need.item] * items.need.quantity
    let totalExchangePoints = itemPoints[items.exchange.item] * items.exchange.quantity

    return totalExchangePoints >= totalNeedPoints
}

export default tradeItems