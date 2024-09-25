$(function() {
  $('#button').on('click', function() {
    const fields = [
      'lb1', 'lb1-2', 'lb1-3',
      'lb2', 'lb2-2', 'lb2-3',
      'lb3',
      'lb4', 'lb4-2',
      'lb5', 'lb5-2',
      'lb6', 'lb6-2',
      'lb7', 'lb7-2'
    ];

    let values = {};

    fields.forEach(field => {
      let value = $('#' + field).val();
      value = field.endsWith('-2') ? parseInt(value) : parseInt(numberReplace(value));
      numberAlert(value);
      values[field] = value;
    });

    function numberAlert(number) {
      if (isNaN(number)) {
        alert('客数が空白もしくは数値以外です');
        throw new Error('Invalid number');
      }
    }

    function numberReplace(number) {
      return number.replace(/,/g, "");
    }

    const totalSell = values['lb1'] + values['lb2'];
    const totallitem = values['lb1-2'] + values['lb2-2'];
    const guestNumber = values['lb1-3'] + values['lb2-3'];
    const achievementRate = Math.round(totalSell / values['lb3']);
    const averageCustomerSpend = Math.round(totalSell / guestNumber);

    $('.result').append(
      '<li>',
      '<p>実績</p><p>¥' + totalSell.toLocaleString() + '(' + totallitem + '点) ' + achievementRate + ' %</p>',
      '</li>',
      '<li class="unit-price">',
      '<p>客単価</p><p>¥' + averageCustomerSpend.toLocaleString() + ' (' + guestNumber + '客) </p>',
      '</li>'
    );

    const individualItems = [
      { label: '洋', sell: 'lb4', total: 'lb4-2' },
      { label: '和', sell: 'lb5', total: 'lb5-2' },
      { label: '砥石', sell: 'lb6', total: 'lb6-2' },
      { label: '鞘', sell: 'lb7', total: 'lb7-2' }
    ];

    individualItems.forEach(item => {
      $('.individual').append(
        '<li>',
        '<p>' + item.label + '</p><p>¥' + values[item.sell].toLocaleString() + ' (' + values[item.total] + ')</p>',
        '</li>'
      );
    });
  });
});
