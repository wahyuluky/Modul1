<?php
$rows = 5; // Jumlah baris

for ($i = $rows; $i >= 1; $i--) {
    // Cetak spasi
    for ($j = $rows; $j > $i; $j--) {
        echo " ";
    }
    // Cetak bintang
    for ($k = 1; $k <= (2 * $i - 1); $k++) {
        echo "*";
    }
    echo "\n";
}
?>
