<?php

class Events {
    /**
     * returns an arrya of events
     */
    public static function getEvents() {
        
        $host = 'localhost';
        $dbname = 'events';
        $user = 'root';
        $password = 'root';

        $db = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);

        $sqlDel = "DELETE FROM `events_name` WHERE `events_name`.`data` < NOW()";
        $db->query($sqlDel);

        $eventsList = array();
        $result = $db->query('SELECT * '
        . 'FROM events_name '
        . 'ORDER BY data ASC '
        . 'LIMIT 10');

        $i = 0;
        while ($event = $result->fetch()) {
            $eventsList[$i]['id'] = $event['id'];
            $eventsList[$i]['name'] = $event['name'];
            $eventsList[$i]['event'] = $event['event'];
            $eventsList[$i]['data'] = $event['data'];
            $eventsList[$i]['price'] = $event['price'];
            $i++;
        }
        $db = null;
        return $eventsList;
    }
}

$result = Events::getEvents();
$json = json_encode($result);
echo $json;
?>