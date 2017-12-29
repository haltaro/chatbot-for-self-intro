(function() {

  var msgIndex, key;
  var botui = new BotUI('search-repo');

  //初期メッセージ．
  botui.message.add({
    content: 'こんにちは！haltaroです！'
  }).then(init);


  // 最初に，（見かけ上）質問を自由に入力してもらう関数．
  // 実際はちゃんと回答する気はない．
  function init() {
    botui.message.add({
      delay: 1000,  //メッセージの表示タイミングをずらす．
      content: '何について，お話ししましょうか？'
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
        delay: 1000,
        content: 'ちなみに，好きな芸人はサンドウィッチマンです．'
      })
    }).then(showQuestions);
  }

  // 質問の選択肢を提示する関数．
  function showQuestions() {
    botui.message.add({
      delay:1000,
      content: '質問を選んでください．'
    }).then(function() {

      // ボタンを提示する．
      return botui.action.button({
        autoHide: false,
        delay: 1000,
        action: [
          {icon: 'user-o', text: '来歴', value: 'carrier'},
          {icon: 'rocket', text: '趣味', value: 'hobby'},
          {icon: 'pencil', text: 'このサイト', value: 'memotaro'}]
      });
    }).then(function(res) {
      botui.action.hide();
      switch (res.value) {
        case 'carrier': showCarrier(); break;
        case 'hobby': showHobby(); break;
        case 'memotaro': showMemotaro(); break;
        default: end();
      }
    });
  }

  // 来歴について説明する関数．
  function showCarrier() {
    botui.message.add({
      delay: 1000,
      content: '大学院では，工学修士（航空宇宙工学）を修了しました．主に，GPS衛星の異常検知について研究しました．'
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: '新卒で約5年間，通信会社の研究所で働きました．主に，通信制御アルゴリズムについて研究しました．'
      });
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: '最後の1年間は，アメリカの外資系研究所に出向しました．これまでの研究生活で，最も幸せな一年間でした．'
      });
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: '現在は，広告代理店でデータマイニングやってます．'
      });
    }).then(askEnd);
  }

  // 趣味について説明する関数．
  function showHobby() {
    botui.message.add({
      delay: 1000,
      content: '趣味はジョギングです．今年の目標は，ハーフマラソンに出場することです．'
    }).then(function() {
      return botui.message.add({
        delay: 2000,
        content: 'また，週末プログラマとして，c++，Python，JavaScriptなどで遊んでいます．'
      });
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: 'Network engineeringとか，Algorithmic tradingとか，Machine learningに興味があります．詳細はProjectsをご参照ください．'
      });
    }).then(askEnd);
  }

  // 本ウェブサイトについて説明する関数．
  function showMemotaro() {
    botui.message.add({
      delay: 1000,
      content: 'このウェブサイトには，Qiita以下で日記以上な技術的メモを書く予定です．'
    }).then(function(){
      return botui.message.add({
        delay: 2000,
        content: '想定読者は私自身です．'
      });
    }).then(function(){
      return botui.message.add({
        delay: 2000,
        content: 'Categoryには，各記事をカテゴリごとにまとめています．'
      });
    }).then(function(){
      return botui.message.add({
        delay: 2000,
        content: 'Projectsには，これまで作成したプロジェクトをまとめています．'
      });
    }).then(function(){
      return botui.message.add({
        delay: 2000,
        content: 'なお，本ウェブサイトの内容を，予告なく変更・削除する場合があります．何卒ご理解のほど，よろしくお願い致します．'
      });
    }).then(askEnd);
  }

  // プログラムを終了するか聞く関数．
  function askEnd(){
    botui.message.add({
      delay:2000,
      content: 'まだ続けますか？'
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
        content: 'それでは，引き続きよろしくお願いします！'
      });
    });
  }

})();
