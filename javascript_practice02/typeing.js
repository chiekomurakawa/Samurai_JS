// 必要なhtml要素の取得
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

// 複数のテキストを格納する配列
const textList = [
    'Hello',
    'This is my App',
    'Tody is Happy',
    'I want to duild app',
    'GoAway',
    'Thanks giving Day',
    'Tomorrow is another day'
    ];
 
let checkTexts = [];   

// ランダムなテキストを画面表示する
const createText = () => {
    const p = document.getElementById('text');
    
    // 配列のインデックスからランダムな数値を生成
    const rnd = Math.floor(Math.random() * textList.length);
    
    // p要素の中身を空にする
    p.textContent = '';
    
    // ランダムなテキストをpに挿入する
    // p.textContent = textList[rnd];
    
    // テキストを1文字ずつにしてp要素に挿入
    checkTexts =textList[rnd].split('').map(value => {
        
        // span要素を生成
        const span =document.createElement('span');
        
        // spanの要素に配列の1文字ずつを当てはめる
        span.textContent = value;
        
        // span要素をP要素に追加していく
        p.appendChild(span);
        
        // 1文字ずつcheckTextsに格納していく
        return span;
    })
    
};
createText();

// スコアの初期値を設定する
let score = 0;

// キーイベント&入力判定処理
const keyDown = e => {
    // 背景色のデフォルト値を設定
    wrap.style.backgroundColor = '#666';
    
    if(e.key === checkTexts[0].textContent) {
        
        // add-colorクラスを付与
        checkTexts[0].className = 'add-color';
        
        // 配列から１文字を削除する
        checkTexts.shift();
        
        //正しいスコアのみ加算
        score++;
     
        // 最後まで入力したら新しいテキストを用意
        if(!checkTexts.length)createText();
    
    // 入力エラー時　Shiftは除く    
    } else if(e.key === 'Shift') {
        wrap.style.backgroundColor = '#666';
    // 入力エラー時　エラーの時は背景赤
    } else {
        wrap.style.backgroundColor = 'red';
    }
};

// ランク判定とメッセージ処理
const rankCheck = score => {
    // テキストを格納する変数を作る
    let text = '';
    
    // スコアに応じて異なるメッセージをtextに格納する
    if(score < 100 ){
        text = `あなたのランクはCです。\nBランクまであと${100- score}文字です`;
    }else if(score < 200 ){
        text = `あなたのランクはBです。\nAランクまであと${200- score}文字です`;
    }else if(score < 300){
        text = `あなたのランクはAです。\nSランクまであと${300- score}文字です`;
    }else if(score >= 300){
        text = `あなたのランクはSです。\nおめでとうございます！`;
    }
    
    // スコアの値を返す
    return `${score}文字打てました！\n${text}\n【OK】リトライ/【キャンセル】終了`;
    
};

// ゲーム終了処理
const gameOver = id => {
    
    // タイマーをストップする
    clearInterval(id);
    
    // スコアの値をrankCheck()に渡してダイアログで結果を表示する
    const result = confirm(rankCheck(score));
    
    if(result) window.location.reload();
};

// タイマー処理
const timer = () => {
    //タイマーの初期値を設定
    let time = 60;
    
    // タイマー要素を取得する
    const count = document.getElementById('count');
    const id = setInterval(() => {
        // タイマーが０になったらタイマーのIDをgameOver()に渡す
        if(time <=0 ) gameOver(id);
        
        // タイマーの表示を１ずつ減らしてく
        count.textContent = time--;
    }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
    // タイマー実行
    timer();
    
    createText();
    
    //スタートボタンを非表示にする処理
    start.style.display = 'none';
    
    // キーボードのイベント処理
    document.addEventListener('keydown', keyDown);
});