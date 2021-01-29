<?php
	
	//jsで送られてきたデータを受け取り、変数に入れます。
	//PHPでは変数の書き方は$と文字列となります。
	$name = htmlspecialchars($_POST['name'], ENT_QUOTES);
	$email = htmlspecialchars($_POST['email'], ENT_QUOTES);
	$tel = htmlspecialchars($_POST['tel'], ENT_QUOTES);
	$type = htmlspecialchars($_POST['type'], ENT_QUOTES);
	$message = htmlspecialchars($_POST['message'], ENT_QUOTES);
	date_default_timezone_set('Asia/Tokyo');
	$datetime = date("Y年m月d日 H時i分s秒");
	
	//以下はメールを送るための1セットのソースコードだと思ってください。
	//まずは文字コードを日本語,UTF-8に設定します。
	header("Content-Type:text/html; charset=UTF-8");
	mb_language("japanese");
	mb_internal_encoding("utf-8");
		
	//送信先のメールアドレスを変数に入れておきます。
	//ただ、変数という箱に入れただけでこれで送れるとかではありません。
	$to="y.hosoda@luckydakara.com";
	// $to = 'device8781@gmail.com,r.kanbayashi@luckydakara.com,k.yumita@luckydakara.com,e.yumita@luckydakara.com,s.watanabe@luckydakara.com,m.hata@luckydakara.com,h.oozeki@luckydakara.com,c.nishida@luckydakara.com,m.inoue@luckydakara.com,m.imano@luckydakara.com,s.hoshi@luckydakara.com,s.sakai@luckydakara.com,a.nishimura@luckydakara.com,y.honoka@luckydakara.com,y.hosoda@luckydakara.com'; 
	//タイトルを変数に入れておきます。
	$sub1="[自動返信] お問い合わせありがとうございます。";
	//$mailareaとは、ユーザーが入力したメールアドレスです。
	//$mail_toという変数に入れて、送る時に使います。
	$mail_to = $email;
	$mailfrom = "https://www.luckydakara.com";
	//メールの本文を書きます。
	//改行しながら変数に一行ずつ書いていきましょう。
	$content = "";
	$content .= $name . "様\r\n";
	$content .= "デバイス・ホームへのお問合せありがとうございます。\r\n";
	$content .= "今後とも、何卒、よろしくお願いいたします。\r\n";
	$content .= "\r\n";
	$content .= "─お問い合わせ内容の確認─────────────────\r\n";
	$content .= "\r\n";
	$content .= "お名前：".$name."\r\n";
	$content .= "メールアドレス：".$email."\r\n";
	$content .= "電話番号：".$tel."\r\n";
	$content .= "ご希望の見学方法：".$type."\r\n";
	$content .= "お問い合わせ内容：\r\n";
	$content .= $message."\r\n";
	$content .= "お問い合わせ日時：".$datetime."\r\n";
	$content .= "\r\n";
	$content .= "─────────────────────────\r\n";
	$content .= "\r\n";
	$content .= "============================================\r\n";
	$content .= "このメールは自動送信です。\r\n";
	$content .= "お心当たりのない方は、お手数をおかけいたしますが、\r\n";
	$content .= "下記メールアドレスまでご連絡ください。\r\n";
	$content .= "============================================\r\n";
	$content .= "\r\n";
	$content .= "ホームページ : https://www.luckydakara.com\r\n";
	$content .= "\r\n";
	$content .= "━━━━━━━━━━━━━━━━━━━━━━━━━━\r\n";
	$content .= "　デバイス・ホーム\r\n";
	$content .= "　本　社：〒965-0816\r\n";
	$content .= "　　　　　福島県会津若松市南千石町3-12\r\n";
	$content .= "　E-mail：info@luckydakara.com\r\n";
	$content .= "━━━━━━━━━━━━━━━━━━━━━━━━━━\r\n";

	$sub2 = $name . "様　2/6~7いわき見学会LPよりお問い合わせがありました。";
	$content2 = "";
	$content2 .= "お問い合わせがありました。\r\n";
	$content2 .= "お問い合わせ内容は下記通りです。\r\n";
	$content2 .= "=================================\r\n";
	$content2 .= "お名前       " . $name."\r\n";
	$content2 .= "メールアドレス   " . $email."\r\n";
	$content2 .= "電話番号   " . $tel."\r\n";
	$content2 .= "希望の見学方法：".$type."\r\n";
	$content2 .= "お問い合わせ内容   " . $message."\r\n";
	$content2 .= "お問い合わせ日時   " . $datetime."\r\n";
	$content2 .= "================================="."\r\n";
	
	//ここでメールを送信します。
	//下記のフォーマットの該当箇所にデータの入った変数をいれましょう。
	//$success1=mb_send_mail(送り先メアド,タイトル,メッセージ内容,"From:".送り元メアド);
	//しかし、これだけでは「自動返信メール」が届きません。
	$success1=mb_send_mail($mail_to,$sub1,$content,"From:".$mailfrom);
	//自動返信メールは送り先メアドと、送り元メアドを交換すると送れます。
	$success2=mb_send_mail($to,$sub2,$content2,"From:".$mailfrom);
	
	//最後はjsonという形で送信メッセージをjsに戻します。
	header('Content-type: application/json');
	echo json_encode( "送信が完了しました！" );
