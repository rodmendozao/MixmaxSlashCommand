var sync = require('synchronize');
var request = require('request');
var stockInfo = require('../utils/StockInfo')

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();

  var symbolInfo
  if (term.substr(0,1) == '!')
  {
    symbolInfo = term.substr(1)
  }
  else
  {
    var symbols = stockInfo.GetStockInfo(term);
    if (symbols)
    {
      symbolInfo = symbols[0]
    }
    else
    {
      res.status(500).send('Error');
      return;
    }
  }

  matches = symbolInfo.match(/(\w* \[[\d.]+ )([+-]*[\d.]+ \([+-]*[\d.]+%\))(.*)/);

  var isNegative = false
  if (matches[2].substr(0,1) == '-')
  {
    isNegative = true
  }

  var html = matches[1]
  html += '<b style="color:#' 
  if (isNegative)
  {
    html += 'D90404' // Red
  }
  else
  {
    html += '20C93A' // Green
  }
  html += ';">'
  html += matches[2]
  html += '</b>'
  html += matches[3]

  res.json({
    body: html
  });
};
