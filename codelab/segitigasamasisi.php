<?php
$rows = 5; // Jumlah baris

for ($i = 1; $i <= $rows; $i++) {
    // Cetak spasi
    for ($j = $i; $j < $rows; $j++) {
        echo " ";
    }
    // Cetak bintang
    for ($k = 1; $k <= (2 * $i - 1); $k++) {
        echo "*";
    }
    echo "\n";
}
?>
