<?php

define('H', 10);
define('W', 10);


function createMap($h, $w)
{
    $map = [];

    for ($y = 0; $y < $h; $y++) {
        for ($x = 0; $x < $w; $x++) {
            $map[$y][$x] = "#";
        }
    }

    return $map;
}


function dig(&$map, $x, $y, $w, $h)
{
    $map[$y][$x] = ".";

    $dirs = [
        [0, -2],
        [0, 2],
        [-2, 0],
        [2, 0]
    ];

    shuffle($dirs);

    foreach ($dirs as $d) {

        $nx = $x + $d[0];
        $ny = $y + $d[1];

        if ($nx > 0 && $nx < $w - 1 && $ny > 0 && $ny < $h - 1) {

            if ($map[$ny][$nx] === "#") {

                $map[$y + $d[1] / 2][$x + $d[0] / 2] = ".";
                dig($map, $nx, $ny, $w, $h);
            }
        }
    }
}


function findEnds($map)
{
    $ends = [];

    for ($y = 1; $y < count($map) - 1; $y++) {
        for ($x = 1; $x < count($map[0]) - 1; $x++) {

            if ($map[$y][$x] !== ".") continue;

            $count = 0;

            if ($map[$y+1][$x] === ".") $count++;
            if ($map[$y-1][$x] === ".") $count++;
            if ($map[$y][$x+1] === ".") $count++;
            if ($map[$y][$x-1] === ".") $count++;

            if ($count === 1) {
                $ends[] = [$x, $y];
            }
        }
    }

    return $ends;
}




$map = createMap(H, W);

dig($map, 1, 1, W, H);

$ends = findEnds($map);
shuffle($ends);

[$sx, $sy] = $ends[0];
[$ex, $ey] = $ends[1];

$map[$sy][$sx] = "S";
$map[$ey][$ex] = "E";

echo "<script>";
echo "const MAP = " . json_encode($map) . ";";
echo "</script>";

?>