<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>KnowledgeN - Verify your Identity</title>
</head>

<body>
	<div class="">
		<div class="aHl"></div>
		<div id=":19g" tabindex="-1"></div>
		<div id=":195" class="ii gt">
			<div id=":194" class="a3s aXjCH">
				<div style="
						font-family: roboto, sans-serif;
						background-color: white;
						max-width: 600px;
						margin: 0 auto;
					">
					<div style="background-color: #003566; padding: 24px 0">
					<img src="{{ $message->embed(base_path() . '/public/img/app_email_header.png') }}" />
					</div>
					<table style="width: 100%; background-color: #ffc300" cellpadding="0" cellspacing="0">
						<tbody>
							<tr>
								<td style="padding: 24px">
									<div style="
											font-size: 20px;
											line-height: 24px;
											color: #323433;
										">
										You are just a step away from Signing in to your account in <b>KnowledgeN</b>
									</div>
								</td>
							</tr>
							<tr></tr>
						</tbody>
					</table>
					<div style="margin-bottom: 24px; padding: 24px 24px 0 24px">
						<table style="
								font-family: Helvetica, Arial, sans-serif;
								font-size: 14px;
								margin: 0;
								padding: 0;
							" cellpadding="0" cellspacing="0" width="100%">
							<tbody>
								<tr style="
										font-family: Helvetica, Arial, sans-serif;
										font-size: 14px;
										margin: 0;
										padding: 0;
									">
									<td style="
											font-family: Helvetica, Arial,
												sans-serif;
											font-size: 12px;
											vertical-align: top;
											margin: 0;
											padding: 0 0 0px;
											float: right;
										" valign="top">
										{{date("l jS \of F Y")}}
									</td>
								</tr>
								<tr style="
										font-family: Helvetica, Arial, sans-serif;
										font-size: 14px;
										margin: 0;
										padding: 0;
									">
									<td style="
											font-family: Helvetica, Arial,
												sans-serif;
											font-size: 14px;
											vertical-align: top;
											margin: 0;
											padding: 0 0 20px;
										" valign="top">
										Dear
										<strong style="
												font-family: Helvetica, Arial,
													sans-serif;
												font-size: 14px;
												margin: 0;
												padding: 0;
											">{{$details['user_first_name']}} {{$details['user_last_name']}}
										</strong>
									</td>
								</tr>
								<tr style="
										font-family: Helvetica, Arial, sans-serif;
										font-size: 14px;
										margin: 0;
										padding: 0;
									">
									<td style="
											font-family: Helvetica, Arial,
												sans-serif;
											font-size: 14px;
											vertical-align: top;
											margin: 0;
											padding: 0 0 20px;
										" valign="top">
										You or someone with your email id signed in at <b>KnowledgeN</b>. But before you login you need to confirm your email by applying below verification code in the app.
										<br><br>
										<table border=0 style="font-family:Helvetica,Arial,sans-serif;font-size:5em;vertical-align:top;margin:0;margin:0 0 20px; background: #e9e8e8;
		border: 1px solid #d1cdcd;
		border-radius: 10px; width: 100%; text-align: center;width: 100%;font-size: 5em;">
											<tr>
												<td>{{$details['user_verification_code']}}</td>
											</tr>

										</table>

										If you haven’t requested this email, there’s nothing to worry about – you can safely ignore it.
										<br /><br />
									</td>
								</tr>
								<tr style="
										font-family: Helvetica, Arial, sans-serif;
										font-size: 14px;
										margin: 0;
										padding: 0;
									">
									<td style="
											font-family: Helvetica, Arial,
												sans-serif;
											font-size: 14px;
											vertical-align: top;
											margin: 0;
											padding: 0 0 20px;
										" valign="top">
										<b>
											Regards<br />
											Team KnowledgeN</b>
									</td>
								</tr>
								<tr style="
										font-family: Helvetica, Arial, sans-serif;
										font-size: 14px;
										margin: 0;
										padding: 0;
									">
									<td style="
											font-family: Helvetica, Arial,
												sans-serif;
											font-size: 14px;
											vertical-align: top;
											margin: 0;
											padding: 0 0 20px;
											font-style: italic;
										" valign="top">
										KnowledgeN - Connecting educator & learner
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div style="background-color: #d7d8da; padding: 20px">
						<table style="width: 100%" cellpadding="0" cellspacing="0">
							<tbody>
								<tr>
									<td>
										<div style="
												font-family: Helvetica, Arial,
													sans-serif;
												font-size: 20px;
												line-height: 24px;
												text-align: center;
												padding: 20px;
											">
											Connect from your favorite space
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<a href="https://knowledgen.rollingarray.co.in/" target="_blank">
											<img style="
													height: 60px;
													display: block;
													margin-left: auto;
													margin-right: auto;
												" 
												src="{{ $message->embed(base_path() . '/public/img/devices.png') }}" class="CToWUd" />
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div style="background-color: #e0e0e0; height: 1px; width: 100%"></div>
					<div style="background-color: #e0e0e0; height: 1px; width: 100%"></div>
					<div style="
							background-color: #eceff1;
							padding: 24px;
							font-size: 12px;
							line-height: 16px;
						">
						<div>
							You are receiving this notification because you have
							registered with
							<span style="color: #56c2e1">
								<a style="text-decoration: none; color: #039be5" href="https://knowledgen.rollingarray.co.in/" target="_blank">KnowledgeN</a></span>
						</div>
						<div style="margin-top: 24px">
							Thanks for using <b>KnowledgeN</b>
						</div>
					</div>
					<div style="background-color: #323433; padding: 20px">
						<table style="width: 100%; text-align: center; color: #fff" cellpadding="0" cellspacing="0">
							<tbody>
								<tr>
									<td>
										<a style="
												font-size: 12px;
												text-decoration: underline;
												color: #fff;
											" href="https://knowledgen.rollingarray.co.in/" target="_blank">
											KnowledgeN
										</a>
										&nbsp; | &nbsp;
										<a style="
												font-size: 12px;
												text-decoration: underline;
												color: #fff;
											" href="https://github.com/RollingArray/knowledgen-client-app" target="_blank">
											Github
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div style="background-color: #323433; padding: 34px">
						<table style="width: 100%" cellpadding="0" cellspacing="0">
							<tbody>
								<tr>
									<td>
										<a href="https://rollingarray.co.in/" target="_blank">
											<img style="
													height: 34px;
													max-height: 34px;
													min-height: 34px;
												" src="https://rollingarray.co.in/images/ra_brand_icon_email.png" class="CToWUd" />
										</a>
									</td>
									<td>
										<div style="
												font-size: 10px;
												line-height: 14px;
												font-weight: 400;
												text-align: right;
											">
											<a style="
													color: #d6dde1;
													text-decoration: none;
												">&copy; {{date("Y")}}
												RollingArray<br />Bangalore, India.
											</a>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="yj6qo"></div>
		</div>
		<div id=":19l" class="ii gt" style="display: none">
			<div id=":19k" class="a3s aXjCH undefined"></div>
		</div>
		<div class="hi"></div>
	</div>

</body>

</html>