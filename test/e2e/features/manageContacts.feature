Feature: Exchange currencies

  Scenario: Add start value to the wallet
    When I browse to the "/"
    Then I should be directed to "/"
    When I click "currency.applyButton"
    Then I should see "PLN: 10,000.00zł" in "currency.walletPLN"

  Scenario: Exchange PLN to USD
    When I click "currency.selectButton"
    And I click "currency.selectedUSD"
    Then I should see the "currency.sellBtnDisabled" element
    When I click "currency.buyBtn"
    Then I should be directed to "http://localhost:9000/#/exchangeBox/buy/USD"
    Then I should see the "currency.acceptValueDisabled" element
    When I enter "1000" into "currency.inputValue" field
    And I click "currency.acceptValue"
    Then I should be directed to "/"
    Then I should see "PLN: 9,000.00zł" in "currency.walletPLN"

  Scenario: Table of currencies
    When I click "currency.infoBtn"
    Then I should be directed to "http://localhost:9000/#/tableOfExchanges"
    Then I should see the "currency.tableCurrency" element
    When I click "currency.backBtn"
    Then I should be directed to "/"

  Scenario: Cancel button
    When I click "currency.selectButton"
    And I click "currency.selectedUSD"
    And I click "currency.sellBtn"
    Then I should be directed to "http://localhost:9000/#/exchangeBox/sell/USD"
    When I click "currency.cancelBtn"
    Then I should be directed to "/"

  Scenario: Exchange USD to PLN
    When I click "currency.selectButton"
    And I click "currency.selectedUSD"
    And I click "currency.sellBtn"
    Then I should be directed to "http://localhost:9000/#/exchangeBox/sell/USD"
    When I enter "200" into "currency.inputValue" field
    And I click "currency.acceptValue"
    Then I should be directed to "/"

  Scenario: Reset button
    When I click "currency.resetBtn"
    Then I should see "PLN: 0.00zł" in "currency.walletPLN"



