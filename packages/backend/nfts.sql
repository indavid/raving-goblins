
CREATE TABLE `allnfts` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `ipfsurl` varchar(255) NOT NULL,
  `uid` int(255) NOT NULL,
  `forsale` varchar(255) NOT NULL,

  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=335 DEFAULT CHARSET=utf8mb4;

/*update allnfts set uid=8 where id=414;

select * from allnfts*/

 
/*drop procedure if exists doWhile;
DELIMITER //  
CREATE PROCEDURE doWhile()   
BEGIN
DECLARE i INT DEFAULT 9; 
WHILE (i <= 1000) DO
insert into allnfts(ipfsurl,uid,forsale)values("QmfYmDk2zoyZV85qmrkLfWcXLUZubWVgka6sLRznNpaJJ2",i,"yes");
    SET i = i+1;
END WHILE;
END;
//  

CALL doWhile();*/
