(function() {

  var url = 'https://api.github.com/search/repositories?q=';
  var msgIndex, key;
  var botui = new BotUI('search-repo');


  //初期メッセージ
  botui.message.bot({
    content: 'はじめまして！haltaroと申します！'
  }).then(excuse);

  // 社交辞令
  function excuse() {
    botui.message.bot({
      delay: 1000,
      content: '本来は直接挨拶すべきところを，チャットボットで失礼致します．'
    }).then(init);
  }

  function init() {
    botui.message.bot({
      delay: 1000,  //メッセージの表示タイミングをずらす
      content: '私について，何をお話ししましょうか？'
    }).then(function() {

      //キーワードの入力
      //「return」を記述して、ユーザーからの入力待ち状態にする
      return botui.action.text({
        delay: 1000,
        action: {
          placeholder: '質問を入力してください．'
        }
      });

    }).then(function(res){

      key = res.value;
      return botui.message.bot({
        delay: 1000,
        content: '「' + key + '」…？'
      });

    }).then(tomizawa);
    }


  // よくわからない質問を適当にあしらう関数．
  function tomizawa() {
    botui.message.bot({
      delay: 2500,
      content: 'ちょっと何言ってるかわからないです．'
    }).then(showOptions);
  }

  // 選択肢を提示する関数．
  function showOptions() {
    botui.message.bot({
      delay:1000,
      content: '次の中から，質問を選んでください．'
    }).then(function() {

      // 質問事項のボタンを提示
      return botui.action.button({
        autoHide: false,
        delay: 1000,
        action: [
          {icon: 'user-o', text: '来歴', value: 'carrier'},
          {icon: 'rocket', text: '趣味', value: 'hobby'},
          {icon: 'pencil', text: '言語', value: 'lang'},
          {icon: 'thumbs-down',text: '興味ない', value: 'none'}]
      });
    }).then(function(res) {
      botui.action.hide();
      switch (res.value) {
        case 'carrier': showCarrier(); break;
        case 'hobby': showHobby(); break;
        default: end();
      }
    });
  }

  function showCarrier() {
    botui.message.bot({
      delay: 1000,
      content: '2013年3月に，工学修士（航空宇宙工学）を修了しました．ここではGPS衛星の異常検知について研究しました．'
    }).then(function() {
      return botui.message.bot({
        delay: 3000,
        content: '2013年4月に，通信会社の研究所に入社しました．主に，通信制御アルゴリズムについて研究しました．'
      });
    }).then(function() {
      return botui.message.bot({
        delay: 3000,
        content: '2016年9月から一年間，アメリカの外資系研究所に出向しました．これまでの研究生活で，最も幸せな一年間でした．'
      });
    }).then(function() {
      return botui.message.bot({
        delay: 3000,
        content: '2018年1月から，広告代理店に転職しました．データマイニングを行う予定です．'
      });
    }).then(showOptions);
  }

  function showHobby() {
    botui.message.bot({
      delay: 1000,
      content: '趣味はジョギングです．近所に多摩川があるので，よく走ってます．'
    }).then(showOptions);
  }


/*
  function init() {
    botui.message.bot({
      delay: 1500,  //メッセージの表示タイミングをずらす
      content: '私について，何をお話したらよいでしょうか？'
    }).then(function() {

      //キーワードの入力
      //「return」を記述して、ユーザーからの入力待ち状態にする
      return botui.action.text({
        delay: 1000,
        action: {
          placeholder: '例：年齢'
        }
      });
    }).then(function(res) {

      //入力されたキーワードを取得する
      key = res.value;
      getRepositories(key);

      //ローディング中のアイコンを表示
      botui.message.bot({
        loading: true
      }).then(function(index) {

        //ローディングアイコンのindexを取得
        //このindexを使ってメッセージ情報を更新する
        //（更新しないとローディングアイコンが消えないため…）
        msgIndex = index;
      });
    });
  }


  //GitHubのリポジトリを取得する処理
  function getRepositories(keyword) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url + keyword);
    xhr.onload = function() {
      var result = JSON.parse(xhr.responseText);

      //取得したリポジトリ数をshowMessage()に代入する
      showMessage(result.total_count);
    }
    xhr.send();
  }
*/

  //リポジトリ総数をメッセージに表示する処理
  function showMessage(totalCount) {

    //ローディングアイコンのindexを使ってメッセージを書き換える
    botui.message.update(msgIndex, {
      content: key + 'のリポジトリ総数は、' + totalCount + '個です！'
    }).then(function() {
      return botui.message.bot({
        delay: 1500,
        content: 'まだ続けますか？'
      })
    }).then(function() {

      //「はい」「いいえ」のボタンを表示
      return botui.action.button({
        delay: 1000,
        action: [{
          icon: 'circle-thin',
          text: 'はい',
          value: true
        }, {
          icon: 'close',
          text: 'いいえ',
          value: false
        }]
      });
    }).then(function(res) {

      //「続ける」か「終了」するかの条件分岐処理
      res.value ? init() : end();
    });
  }


  //プログラムを終了する処理
  function end() {
    botui.message.bot({
      delay: 1000,
      content: 'お時間頂き，ありがとうございました．'
    }).then(function(){
      return botui.message.bot({
        delay: 1000,
        content: 'それでは，引き続きよろしくお願いします！'
      });
    });
  }

})();
