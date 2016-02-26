var sync = require('synchronize');
var request = require('request');

module.exports =
{
  GetStockInfo: function(term)
  {
    var response;
    try {
      response = sync.await(request({
        url: 'http://www.nasdaq.com/aspx/symbolnamesearch.aspx',
        qs: {
          q: term
        },
        timeout: 10 * 1000
      }, sync.defer()));
    } catch (e) {
      res.status(500).send('Error');
      return;
    }

    var matches = response.body.split('\n');
    var symbols = new Array()

    for (var i = 0; i < matches.length; i++)
    {
      var symbolAndName = matches[i].split(' | ');
      var symbol = symbolAndName[0].trim();

      var name = ''
      if (symbolAndName[1])
      {
        name = symbolAndName[1].split(';')[0]
      }

      var knownSymbol = true
      try {
        response = sync.await(request({
          url: 'http://www.google.com/finance/info',
          qs: {
            q: 'NASDAQ:' + symbol
          },
          timeout: 10 * 1000
        }, sync.defer()));
      } catch (e) {
        // Ignore unknown symbols
        knownSymbol = false
      }

      if (knownSymbol)
      {
        var symbolMatches = response.body.trim().match(/\/\/\s+\[((.|\n)*)\]/);

        if (symbolMatches)
        {
          var jsonSymbolInfo = JSON.parse(symbolMatches[1])
          var symbolInfo = jsonSymbolInfo.l_fix + ' ' + jsonSymbolInfo.c + ' (' + jsonSymbolInfo.cp + '%)'

          symbols.push(symbol + ' [' + symbolInfo + ']: ' + name)
        }
      }
    }
    return symbols
  }
};