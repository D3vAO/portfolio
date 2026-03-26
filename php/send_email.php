<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
}

// Collect and sanitize form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo 'Please fill in all fields.';
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'Invalid email format.';
    exit;
}

$nameClean = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$emailClean = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$messageClean = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

$to = 'devao.developer@gmail.com';
$subject = "Portfolio Message from $nameClean";
$body = "You have received a new message from your website contact form.\n\n";
$body .= "Name: $nameClean\n";
$body .= "Email: $emailClean\n";
$body .= "Message:\n$messageClean\n";

// Função mínima para carregar .env se getenv não tiver variáveis
function load_env($path) {
    if (!file_exists($path)) return;
    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (!strpos($line, '=')) continue;
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        if (getenv($name) === false) {
            putenv("$name=$value");
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

load_env(__DIR__ . '/../.env');

$brevoApiKey = getenv('BREVO_API_KEY') ?: '';
$brevoFromEmail = getenv('BREVO_FROM_EMAIL') ?: 'noreply@yourdomain.com';
$brevoFromName = getenv('BREVO_FROM_NAME') ?: 'Portfolio Contact';

if ($brevoApiKey !== 'YOUR_BREVO_API_KEY' && !empty($brevoApiKey)) {
    $postData = json_encode([
        'sender' => [
            'name' => $brevoFromName,
            'email' => $brevoFromEmail
        ],
        'to' => [[
            'email' => $to,
            'name' => 'Allan Ortega'
        ]],
        'subject' => $subject,
        'textContent' => $body,
        'replyTo' => [
            'email' => $emailClean,
            'name' => $nameClean
        ]
    ]);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.brevo.com/v3/smtp/email');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json',
        'api-key: ' . $brevoApiKey
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        header('Location: ../index.html?status=success');
        exit;
    }

    $brevoError = 'Brevo error: HTTP ' . $httpCode . ' - ' . $response . ' - ' . $curlError;
    error_log($brevoError);

    // Retorno detalhado no frontend para debug (use somente em teste)
    $params = http_build_query(['status' => 'error', 'msg' => 'brevo_fail', 'code' => $httpCode]);
    header('Location: ../index.html?' . $params);
    exit;
}

// Fallback para mail() (isto pode não funcionar sem servidor SMTP configurado)
$headers = "From: $nameClean <$emailClean>\r\n";
$headers .= "Reply-To: $emailClean\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body, $headers)) {
    header('Location: ../index.html?status=success');
    exit;
}

header('Location: ../index.html?status=error');
exit;
?>
