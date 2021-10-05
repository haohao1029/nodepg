'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     
     await queryInterface.bulkInsert('Accounts', [
      {
        name: "Cash and Bank",
        default: "debit",
        reportingType: "balance sheet",
        type: "Assets",
        createdAt: new Date(),
        updatedAt: new Date()
  
      },{
        name: "Money in Transit",
        default: "debit",
        reportingType: "balance sheet",
        type: "Assets",
        createdAt: new Date(),
        updatedAt: new Date()

      },{
      name: "Expected Payment from Customers",
      default: "debit",
      reportingType: "balance sheet",
      type: "Assets",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Inventory",
      default: "debit",
      reportingType: "balance sheet",
      type: "Assets",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Property,Plant,Equipment",
      default: "debit",
      reportingType: "balance sheet",
      type: "Assets",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Depreciation and Amortization",
      default: "debit",
      reportingType: "balance sheet",
      type: "Assets",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Vendor Prepayments and Vendor Credits",
      default: "debit",
      reportingType: "balance sheet",
      type: "Assets",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Other Long-Term Asset",
      default: "debit",
      reportingType: "balance sheet",
      type: "Assets",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Other Short-Term Asset",
      default: "debit",
      reportingType: "balance sheet",
      type: "Assets",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Account Receivable",
      default: "debit",
      reportingType: "balance sheet",
      type: "Assets",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Business Owner Contribution and Drawing",
      default: "debit",
      reportingType: "balance sheet",
      type: "Equity",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Retained Earnings: Profit",
      default: "debit",
      reportingType: "balance sheet",
      type: "Equity",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Food",
      default: "debit",
      reportingType: "profit & loss",
      type: "Expenses",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Health",
      default: "debit",
      reportingType: "profit & loss",
      type: "Expenses",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "House",
      default: "debit",
      reportingType: "profit & loss",
      type: "Expenses",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Cost of Goods Sold",
      default: "debit",
      reportingType: "profit & loss",
      type: "Expenses",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Education",
      default: "debit",
      reportingType: "profit & loss",
      type: "Expenses",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Gift",
      default: "debit",
      reportingType: "profit & loss",
      type: "Expenses",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Uncategorized Expense",
      default: "debit",
      reportingType: "profit & loss",
      type: "Expenses",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Loan and Line of Credit",
      default: "credit",
      reportingType: "balance sheet",
      type: "Liabilities",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Account Payable",
      default: "credit",
      reportingType: "balance sheet",
      type: "Liabilities",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Expected Payment to Vendors",
      default: "credit",
      reportingType: "balance sheet",
      type: "Liabilities",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Credit Card",
      default: "credit",
      reportingType: "balance sheet",
      type: "Liabilities",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Sales Taxes",
      default: "credit",
      reportingType: "balance sheet",
      type: "Liabilities",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Credit Card",
      default: "credit",
      reportingType: "balance sheet",
      type: "Liabilities",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Due For Payrol",
      default: "credit",
      reportingType: "balance sheet",
      type: "Liabilities",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Due to You and Other Business Owners",
      default: "credit",
      reportingType: "balance sheet",
      type: "Liabilities",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Other Short-Term Liability",
      default: "credit",
      reportingType: "balance sheet",
      type: "Liabilities",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Other Long-Term Liability",
      default: "credit",
      reportingType: "balance sheet",
      type: "Liabilities",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Income",
      default: "credit",
      reportingType: "profit & loss",
      type: "Revenues",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Discount",
      default: "credit",
      reportingType: "profit & loss",
      type: "Revenues",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Uncategorized Income",
      default: "credit",
      reportingType: "profit & loss",
      type: "Revenues",
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: "Gain on Foreign Exchange",
      default: "credit",
      reportingType: "profit & loss",
      type: "Revenues",
      createdAt: new Date(),
      updatedAt: new Date()

    },
  ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
