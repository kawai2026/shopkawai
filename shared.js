// ============================================================
// shared.js — 全ページ共通のデータ管理
// ============================================================

const SK = {
  // --- ステータス ---
  STATUS_CLASS: {
    '在庫あり:1～2営業日以内出荷':               's-in1',
    '在庫あり:2～3営業日以内出荷':               's-in2',
    '予約受付中:出荷日は商品タイトルに記載':       's-rsv',
    '当店在庫なし:取り寄せ可(3～5営業日以内出荷)': 's-ord1',
    '当店在庫なし:取り寄せ可(6～8営業日以内出荷)': 's-ord2',
    '当店在庫なし:入荷見込みなし':               's-noin',
    '販売終了': 's-end',
    '非公開':   's-hid',
  },
  NO_ORDER: ['当店在庫なし:入荷見込みなし', '販売終了'],
  HIDDEN:   ['非公開'],

  PREFS: ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'],

  // --- デフォルトデータ ---
  defaultProducts() {
    return [
      {id:1,status:'在庫あり:1～2営業日以内出荷',cat:'レコード',title:'Abbey Road',artist:'The Beatles',jan:'4988031234567',num:'APCL-1234',cond:'中古',date:'1969-09-26',stock:3,price:2800,shippingId:1},
      {id:2,status:'在庫あり:2～3営業日以内出荷',cat:'レコード',title:'Kind of Blue',artist:'Miles Davis',jan:'4988031234568',num:'SICP-5678',cond:'中古',date:'1959-08-17',stock:1,price:3200,shippingId:1},
      {id:3,status:'予約受付中:出荷日は商品タイトルに記載',cat:'CD',title:'Thriller (2025年6月発売)',artist:'Michael Jackson',jan:'4988031234569',num:'EICP-9012',cond:'新品',date:'2025-06-01',stock:0,price:1800,shippingId:2},
      {id:4,status:'当店在庫なし:取り寄せ可(3～5営業日以内出荷)',cat:'CD',title:'Back in Black',artist:'AC/DC',jan:'4988031234570',num:'MHCP-3456',cond:'新品',date:'1980-07-25',stock:0,price:1500,shippingId:2},
      {id:5,status:'当店在庫なし:取り寄せ可(6～8営業日以内出荷)',cat:'DVD',title:'Live at Budokan',artist:'山下達郎',jan:'4988031234571',num:'MOON-7890',cond:'新品',date:'2024-12-01',stock:0,price:4500,shippingId:3},
      {id:6,status:'当店在庫なし:入荷見込みなし',cat:'レコード',title:'Purple Rain',artist:'Prince',jan:'4988031234572',num:'WPCR-1234',cond:'中古',date:'1984-06-25',stock:2,price:2200,shippingId:1},
      {id:7,status:'販売終了',cat:'DVD',title:'First Love',artist:'宇多田ヒカル',jan:'4988031234573',num:'TOCT-5678',cond:'新品',date:'1999-03-10',stock:5,price:3800,shippingId:2},
      {id:8,status:'非公開',cat:'レコード',title:'The Dark Side of the Moon',artist:'Pink Floyd',jan:'4988031234574',num:'PHJR-9012',cond:'中古',date:'1973-03-01',stock:2,price:3500,shippingId:1},
    ];
  },

  defaultShipping() {
    const prefFees = {};
    SK.PREFS.forEach(p => {
      if (['北海道'].includes(p)) prefFees[p] = 1500;
      else if (['沖縄県'].includes(p)) prefFees[p] = 1800;
      else if (['青森県','岩手県','宮城県','秋田県','山形県'].includes(p)) prefFees[p] = 1200;
      else if (['東京都','神奈川県','埼玉県','千葉県','茨城県','栃木県','群馬県','福島県'].includes(p)) prefFees[p] = 800;
      else prefFees[p] = 1000;
    });
    return [
      {id:1,name:'メール便',type:'flat',flatFee:200,isDefault:true},
      {id:2,name:'宅配便',type:'pref',prefFees,isDefault:false},
      {id:3,name:'送料無料',type:'free',flatFee:0,isDefault:false},
    ];
  },

  defaultBankAccounts() {
    return [
      {id:1, bankName:'○○銀行', branch:'△△支店', type:'普通', number:'1234567', holder:'ショップカワイ'},
    ];
  },

  defaultGuide() {
    return `## ご注文の流れ
1. 商品をカートに追加してください
2. カートを確認後「注文情報の入力へ」を押してください
3. お客様情報を入力し「注文を確定する」を押してください
4. 確認メールが届きましたら、7日以内にお振込みをお願いします
5. ご入金確認後、発送いたします

## お支払いについて
銀行振込のみご利用いただけます。振込手数料はお客様のご負担となります。

## 発送について
ご入金確認後、商品のステータスに記載の日数以内に発送いたします。

## キャンセル・返品について
商品の性質上、お客様都合によるキャンセル・返品はお受けできません。
商品に問題がある場合は、お問い合わせページよりご連絡ください。`;
  },

  defaultLegal() {
    return `## 特定商取引法に基づく表記

**販売業者**
ショップカワイ

**運営責任者**
（氏名を入力してください）

**所在地**
（住所を入力してください）

**電話番号**
（電話番号を入力してください）※お問い合わせはメールにてお願いします

**メールアドレス**
（メールアドレスを入力してください）

**販売価格**
各商品ページに記載の価格（税込）

**商品代金以外の費用**
送料：各商品ページに記載の配送方法に準じます
振込手数料：お客様負担

**お支払い方法**
銀行振込

**お支払い期限**
注文確認後7日以内

**商品の引き渡し時期**
ご入金確認後、商品ページ記載の日数以内に発送

**返品・キャンセルについて**
商品に瑕疵がある場合を除き、返品・キャンセルはお受けできません。
商品到着後7日以内にお問い合わせください。`;
  },

  defaultPrivacy() {
    return `## プライバシーポリシー

ショップカワイ本店（以下「当店」）は、お客様の個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。

## 取得する個人情報
当店は、注文・お問い合わせの際に以下の情報を取得します。
- お名前
- メールアドレス
- 電話番号
- ご住所
- その他お客様が入力された情報

## 利用目的
取得した個人情報は以下の目的で利用します。
- 商品の発送および注文管理
- お問い合わせへの対応
- 法令に基づく対応

## 第三者への提供
当店は、法令に基づく場合を除き、お客様の同意なく第三者に個人情報を提供しません。

## 個人情報の管理
当店は、個人情報の漏洩・紛失・改ざんを防ぐために適切な安全管理を行います。

## お問い合わせ
個人情報に関するお問い合わせは、お問い合わせページよりご連絡ください。`;
  },

  defaultTerms() {
    return `## 利用規約

ショップカワイ本店（以下「当店」）のウェブサイトをご利用いただくにあたり、以下の利用規約に同意いただいたものとみなします。

## サービスの利用
当店のサービスは、日本国内在住のお客様を対象としています。

## 禁止事項
以下の行為を禁止します。
- 虚偽の情報を入力すること
- 当店のサービスを不正に利用すること
- 他のお客様や第三者に迷惑をかける行為

## 免責事項
当店は、天災・通信障害その他の不可抗力により生じた損害について責任を負いません。

## 規約の変更
当店は、必要に応じて本規約を変更することがあります。変更後はウェブサイトに掲載した時点で効力が生じます。

## 準拠法・裁判管轄
本規約は日本法に準拠し、紛争については当店所在地を管轄する裁判所を専属的合意管轄とします。`;
  },

  defaultContactFields() {
    return [
      {id:1, label:'お名前', type:'text', required:true},
      {id:2, label:'メールアドレス', type:'email', required:true},
      {id:3, label:'ご質問内容', type:'textarea', required:true},
    ];
  },

  defaultContactEmail() { return ''; },

  // --- ロード ---
  load(key, defaultFn) {
    try { const d = localStorage.getItem(key); return d ? JSON.parse(d) : defaultFn(); }
    catch(e) { return defaultFn(); }
  },
  save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {} },

  // --- 各データのショートカット ---
  loadProducts()       { return SK.load('skProducts',       SK.defaultProducts); },
  loadShipping()       { return SK.load('skShipping',       SK.defaultShipping); },
  loadBankAccounts()   { return SK.load('skBankAccounts',   SK.defaultBankAccounts); },
  loadGuide()          { return SK.load('skGuide',          SK.defaultGuide); },
  loadLegal()          { return SK.load('skLegal',          SK.defaultLegal); },
  loadPrivacy()        { return SK.load('skPrivacy',        SK.defaultPrivacy); },
  loadTerms()          { return SK.load('skTerms',          SK.defaultTerms); },
  loadContactFields()  { return SK.load('skContactFields',  SK.defaultContactFields); },
  loadContactEmail()   { return SK.load('skContactEmail',   SK.defaultContactEmail); },

  saveProducts(v)      { SK.save('skProducts', v); },
  saveShipping(v)      { SK.save('skShipping', v); },
  saveBankAccounts(v)  { SK.save('skBankAccounts', v); },
  saveGuide(v)         { SK.save('skGuide', v); },
  saveLegal(v)         { SK.save('skLegal', v); },
  savePrivacy(v)       { SK.save('skPrivacy', v); },
  saveTerms(v)         { SK.save('skTerms', v); },
  saveContactFields(v) { SK.save('skContactFields', v); },
  saveContactEmail(v)  { SK.save('skContactEmail', v); },

  // --- ユーティリティ ---
  parseDate(str) {
    // 2025/09/17 や 2025/9/17 → 2025-09-17
    if (!str) return '';
    const m = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
    if (m) return `${m[1]}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}`;
    return str;
  },

  // Markdown風テキストをHTMLに変換（## 見出し、**太字**、- リスト）
  mdToHtml(text) {
    if (!text) return '';
    return text
      .split('\n')
      .map(line => {
        if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
        if (line.startsWith('# '))  return `<h1>${line.slice(2)}</h1>`;
        if (line.startsWith('- '))  return `<li>${line.slice(2).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')}</li>`;
        const l = line.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
        return l.trim() === '' ? '<br>' : `<p>${l}</p>`;
      })
      .join('');
  },

  getShipping(id, methods) {
    return methods.find(s => s.id === id) || methods.find(s => s.isDefault) || methods[0];
  },
};
