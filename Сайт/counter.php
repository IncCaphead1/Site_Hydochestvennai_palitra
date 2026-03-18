<?php
// counter.php - счетчик просмотров и посетителей
$counterFile = __DIR__ . '/counter_stats.json';
$visitorIP = $_SERVER['REMOTE_ADDR'];
$today = date('Y-m-d');

// Функция для безопасного чтения/записи JSON
function readStats($file) {
    if (!file_exists($file)) {
        return [
            'total_views' => 0,
            'unique_visitors' => [],
            'daily_views' => [],
            'daily_unique' => []
        ];
    }
    $data = file_get_contents($file);
    return json_decode($data, true) ?: [];
}

function writeStats($file, $stats) {
    file_put_contents($file, json_encode($stats, JSON_PRETTY_PRINT));
}

// Читаем текущую статистику
$stats = readStats($counterFile);

// Обновляем счетчики
$stats['total_views']++;

if (!isset($stats['daily_views'][$today])) {
    $stats['daily_views'][$today] = 0;
}
$stats['daily_views'][$today]++;

if (!in_array($visitorIP, $stats['unique_visitors'])) {
    $stats['unique_visitors'][] = $visitorIP;
}

if (!isset($stats['daily_unique'][$today])) {
    $stats['daily_unique'][$today] = [];
}
if (!in_array($visitorIP, $stats['daily_unique'][$today])) {
    $stats['daily_unique'][$today][] = $visitorIP;
}

// Сохраняем
writeStats($counterFile, $stats);

// Формируем переменные для вывода
$totalViews = number_format($stats['total_views']);
$uniqueVisitors = number_format(count($stats['unique_visitors']));
$todayViews = number_format($stats['daily_views'][$today]);
$todayUnique = number_format(count($stats['daily_unique'][$today]));
?>