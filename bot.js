(function() {

  var key;
  var botui = new BotUI('self-intro');

  //初期メッセージ．
  botui.message.add({
    content: 'はじめまして，xxxと申します．'
  }).then(function() {
    return botui.message.add({
      delay: 1500,
      content: '2018年1月より，中途入社致しました．よろしくお願いします．'
    });
  }).then(function() {
    return botui.message.add({
      delay: 2000,
      content: '本来であれば，直接伺ってご挨拶すべきところですが，それはちょっと大変ですので，'
    });
  }).then(function() {
    return botui.message.add({
      delay: 3000,
      content: '雑に作ったチャットボットで自己紹介させて頂きます．'
    });
  }).then(init);


  // 最初に，（見かけ上）質問を自由に入力してもらう関数．
  // 実際はちゃんと回答する気はない．
  function init() {
    botui.message.add({
      delay: 2000,  //メッセージの表示タイミングをずらす．
      content: '質問を入力してください．'
    }).then(function() {

      //キーワードの入力
      return botui.action.text({
        delay: 1000,
        action: {
          placeholder: '質問を入力'
        }
      });

    }).then(function(res){

      key = res.value;
      return botui.message.add({
        delay: 1000,
        content: '「' + key + '」…？'
      });

    }).then(tomizawa);
    }


  // よくわからない質問を適当にあしらう関数．
  function tomizawa() {
    botui.message.add({
      delay: 2500,
      content: 'ちょっと何言ってるかわからないです．'
    }).then(function() {
      return botui.message.add({
        delay: 1500,
        content: 'ちなみに，好きな芸人はサンドウィッチマンです．'
      })
    }).then(showQuestions);
  }

  // 質問の選択肢を提示する関数．
  function showQuestions() {
    botui.message.add({
      delay:1500,
      content: '質問を選んでください．'
    }).then(function() {

      // ボタンを提示する．
      return botui.action.button({
        autoHide: false,
        delay: 1000,
        action: [
          {icon: 'user-o', text: '来歴', value: 'carrier'},
          {icon: 'rocket', text: '趣味', value: 'hobby'},
          {icon: 'comment', text: '意気込み', value: 'comment'}]
      });
    }).then(function(res) {
      botui.action.hide();
      switch (res.value) {
        case 'carrier': showCarrier(); break;
        case 'hobby': showHobby(); break;
        case 'comment': showComment(); break;
        default: end();
      }
    });
  }

  // 来歴について説明する関数．
  function showCarrier() {
    botui.message.add({
      delay: 1000,
      content: 'xxx出身です．'
    }).then(function() {
      return botui.message.add({
        delay: 1500,
        content: '中学・高校は，軟式テニス部に入部しました．テニスの王子様の影響です．'
      });
    }).then(function() {
      return botui.message.add({
        delay: 1500,
        type: 'embed',
        content: 'fig/ryoma.jpg'
      });
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: '大学時代は，航空宇宙工学科に所属していました．宇宙兄弟の影響です．'
      });
    }).then(function() {
      return botui.message.add({
        delay: 1500,
        type: 'embed',
        content: 'https://www.youtube.com/embed/HMm725pwSp8'
      });
    }).then(function() {
      return botui.message.add({
        delay: 3000,
        content: '新卒では，某通信会社に就職しました．xxxの影響です．'
      });
    }).then(askEnd);
  }

  // 趣味について説明する関数．
  function showHobby() {
    botui.message.add({
      delay: 1000,
      content: '趣味はジョギングです．'
    }).then(function() {
      return botui.message.add({
        delay: 1000,
        type: 'embed',
        content: 'fig/running.png'
      });
    }).then(function() {
      return botui.message.add({
        delay: 1500,
        content: 'あと自転車も好きです．'
      });
    }).then(function() {
      return botui.message.add({
        delay: 1000,
        type: 'embed',
        content: 'fig/bicycle.png'
      });
    }).then(askEnd);
  }

  // 本ウェブサイトについて説明する関数．
  function showComment() {
    botui.message.add({
      delay: 1000,
      content: 'がんばります'
    }).then(askEnd);
  }

  // プログラムを終了するか聞く関数．
  function askEnd(){
    botui.message.add({
      delay:2000,
      content: '他に質問がありますか？'
    }).then(function() {

      // ボタンを提示する．
      return botui.action.button({
        delay: 1000,
        action: [
          {icon: 'circle-o', text: 'はい', value: true},
          {icon: 'close', text: 'いいえ', value: false}]
      });
    }).then(function(res) {
      res.value ? showQuestions() : end();
      });
  }

  //プログラムを終了する関数．
  function end() {
    botui.message.add({
      delay: 1000,
      content: 'お時間頂き，ありがとうございました．'
    }).then(function(){
      return botui.message.add({
        delay: 1000,
        content: 'それでは，よろしくお願い致します．'
      });
    });
  }

})();
