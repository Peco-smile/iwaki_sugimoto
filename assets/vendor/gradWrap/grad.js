!(function ($) {
  var itemHeights = []
  var returnHeight

  $(function () {
    $('.grad-item').each(function () {
      //ターゲット(縮めるアイテム)
      var thisHeight = $(this).height() //ターゲットの高さを取得
      itemHeights.push(thisHeight) //それぞれの高さを配列に入れる
      $(this).addClass('is-hide') //CSSで指定した高さにする
      returnHeight = $(this).height() //is-hideの高さを取得
    })
  })

  $('.grad-trigger').click(function () {
    //トリガーをクリックしたら
    if (!$(this).hasClass('is-show')) {
      var index = $(this).index('.grad-trigger') //トリガーが何個目か
      var addHeight = itemHeights[index] //個数に対応する高さを取得
      $(this).addClass('is-show').next().animate({ height: addHeight }, ).removeClass('is-hide') //高さを元に戻す
    } else {
      $(this)
        .removeClass('is-show')
        .next()
        .animate({ height: returnHeight }, )
        .addClass('is-hide') //高さを制限する
    }
  })
})(jQuery)
