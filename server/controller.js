module.exports = {
    getHouses: (req, res) => res.status(200).send(houses),
    deleteHouse: (req, res) => {
        let index = houses.findIndex(element => element.id === +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        let { address, price, imageURL } = req.body
        let newHouse = {
            id: currentId,
            address,
            price: +price,
            imageURL
        }
        houses.push(newHouse)
        res.status(200).send(houses)
        currentId++
    },
    updateHouse: (req, res) => {
        let { type } = req.body
        let index = houses.findIndex(element => element.id === +req.params.id)
        if(type === `plus`){
            houses[index].price += 10000
            res.status(200).send(houses)
        }
        else if(type === `minus` && houses[index].price >= 10000){
            houses[index].price -=10000
            res.status(200).send(houses)
        }
        else if(type === `minus` && houses[index].price < 10000){
            houses[index].price = 0
            res.status(200).send(houses)
        }
        else{
            res.sendStatus(400)
        }
    }
}

const houses = require(`./db.json`)

let currentId = 4;