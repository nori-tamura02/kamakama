$(function() {
  $('#button').on('click', function() {
    // 前回の結果をクリア
    $('.result, .individual').empty();

    // 数値取得とチェックを一度に行う関数
    const getValue = (selector, replace = false) => {
      let val = $(selector).val();
      if (replace) val = val.replace(/,/g, ""); // カンマを除去
      val = parseInt(val);
      if (isNaN(val)) alert('客数が空白もしくは数値以外です');
      return val || 0; // NaNの場合は0を返す
    };

    // 各入力値の取得
    const num = {
      A1: getValue('#lb1', true), B1: getValue('#lb1-2'), C1: getValue('#lb1-3'),
      A2: getValue('#lb2', true), B2: getValue('#lb2-2'), C2: getValue('#lb2-3'),
      C: getValue('#lb3'), D1: getValue('#lb4', true), D2: getValue('#lb4-2'),
      E1: getValue('#lb5', true), E2: getValue('#lb5-2'), F1: getValue('#lb6', true),
      F2: getValue('#lb6-2'), G1: getValue('#lb7', true), G2: getValue('#lb7-2')
    };

    // 各合計の計算
    const totalSell = num.A1 + num.A2;
    const totalItem = num.B1 + num.B2;
    const guestNumber = num.C1 + num.C2;
    const achievementRate = Math.round(totalSell / num.C);
    const averageSpend = Math.round(totalSell / guestNumber);

    // 結果の出力
    $('.result').append(`
      <li><p>実績</p><p>¥${totalSell.toLocaleString()} (${totalItem}点) ${achievementRate}%</p></li>
      <li class="unit-price"><p>客単価</p><p>¥${averageSpend.toLocaleString()} (${guestNumber}客)</p></li>
    `);

    // 各カテゴリの販売額表示
    [['洋', '#lb4', '#lb4-2'], ['和', '#lb5', '#lb5-2'], ['砥石', '#lb6', '#lb6-2'], ['鞘', '#lb7', '#lb7-2']].forEach(item => {
      $('.individual').append(`
        <li><p>${item[0]}</p><p>¥${$(item[1]).val().toLocaleString()} (${ $(item[2]).val() })</p></li>
      `);
    });
  });
});
