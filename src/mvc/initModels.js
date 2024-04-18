const Roles = require('./roles/roles.model')
const Users = require('./users/users.model')
const Customers = require('./customers/customers.model')
const Invoices = require('./invoices/invoices.model')
const Paytypes = require('./paytypes/paytypes.model')
const Cashouts = require('./cashouts/cashouts.model')
const Products = require('./products/products.model')

const initModels = () => {

    Users.belongsTo(Roles, { as: 'user_role', foreignKey: 'userRoleId' })
    Invoices.belongsTo(Users, { as: 'employee', foreignKey: 'employeeId' })
    Invoices.belongsTo(Customers, { as: 'customer', foreignKey: 'customerId' })
    Invoices.belongsTo(Paytypes, { as: 'paytype', foreignKey: 'paytypeId' })
    Cashouts.belongsTo(Users, { as: 'employee', foreignKey: 'employeeId' })

}

module.exports = initModels
