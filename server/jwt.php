<?php
/**
 * JSON Web Token implementation
 * PHP: http://khoapham.vn/lap-trinh-php.html
 * React Native: http://khoapham.vn/khoa-hoc-lap-trinh-react-native.html
 * Android: http://khoapham.vn/khoa-hoc-lap-trinh-android.html
 * iOS: http://khoapham.vn/khoa-hoc-laptrinhios.html
 * NodeJS: http://khoapham.vn/khoa-hoc-lap-trinh-nodejs.html
 */
class JWT
{
	public static function decode($jwt, $key = null, $verify = true)
	{
		$tks = explode('.', $jwt);
		if (count($tks) != 3) {
			throw new UnexpectedValueException('Wrong number of segments');
		}
		list($headb64, $bodyb64, $cryptob64) = $tks;
		if (null === ($header = JWT::jsonDecode(JWT::urlsafeB64Decode($headb64)))) {
			throw new UnexpectedValueException('Invalid segment encoding');
		}
		if (null === $payload = JWT::jsonDecode(JWT::urlsafeB64Decode($bodyb64))) {
			throw new UnexpectedValueException('Invalid segment encoding');
		}
		$sig = JWT::urlsafeB64Decode($cryptob64);
		if ($verify) {
			if (empty($header->alg)) {
				throw new DomainException('Empty algorithm');
			}
			if ($sig != JWT::sign("$headb64.$bodyb64", $key, $header->alg)) {
				throw new UnexpectedValueException('Signature verification failed');
			}
		}
		return $payload;
	}

	public static function encode($payload, $key, $algo = 'HS256')
	{
		$header = array('typ' => 'JWT', 'alg' => $algo);
		$segments = array();
		$segments[] = JWT::urlsafeB64Encode(JWT::jsonEncode($header));
		$segments[] = JWT::urlsafeB64Encode(JWT::jsonEncode($payload));
		$signing_input = implode('.', $segments);
		$signature = JWT::sign($signing_input, $key, $algo);
		$segments[] = JWT::urlsafeB64Encode($signature);
		return implode('.', $segments);
	}

	public static function sign($msg, $key, $method = 'HS256')
	{
		$methods = array(
			'HS256' => 'sha256',
			'HS384' => 'sha384',
			'HS512' => 'sha512',
		);
		if (empty($methods[$method])) {
			throw new DomainException('Algorithm not supported');
		}
		return hash_hmac($methods[$method], $msg, $key, true);
	}

	public static function jsonDecode($input)
	{
		$obj = json_decode($input);
		if (function_exists('json_last_error') && $errno = json_last_error()) {
			JWT::_handleJsonError($errno);
		} else if ($obj === null && $input !== 'null') {
			throw new DomainException('Null result with non-null input');
		}
		return $obj;
	}

	public static function jsonEncode($input)
	{
		$json = json_encode($input);
		if (function_exists('json_last_error') && $errno = json_last_error()) {
			JWT::_handleJsonError($errno);
		} else if ($json === 'null' && $input !== null) {
			throw new DomainException('Null result with non-null input');
		}
		return $json;
	}

	public static function urlsafeB64Decode($input)
	{
		$remainder = strlen($input) % 4;
		if ($remainder) {
			$padlen = 4 - $remainder;
			$input .= str_repeat('=', $padlen);
		}
		return base64_decode(strtr($input, '-_', '+/'));
	}

	public static function urlsafeB64Encode($input)
	{
		return str_replace('=', '', strtr(base64_encode($input), '+/', '-_'));
	}

	private static function _handleJsonError($errno)
	{
		$messages = array(
			JSON_ERROR_DEPTH => 'Maximum stack depth exceeded',
			JSON_ERROR_CTRL_CHAR => 'Unexpected control character found',
			JSON_ERROR_SYNTAX => 'Syntax error, malformed JSON'
		);
		throw new DomainException(
			isset($messages[$errno])
			? $messages[$errno]
			: 'Unknown JSON error: ' . $errno
		);
	}
}

class JsonHelper {
		public static function getJson($key, $value){
				$out = array($key => $value);
				return json_encode($out);
		}
}
