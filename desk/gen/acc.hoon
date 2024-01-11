!:
:-  %say
::  :near-handler +near-handler!acc %add 0x0
|=  $:  [now=@da eny=@uvJ bec=beak]
        $:  act=?(%add %del %poke)
            acc=@uxH
        ~
        ==
        ~
    ==
?-  act
%del   [%near-handler-action [%del acc]]
%add   [%near-handler-action [%add acc]]
%poke  [%near-handler-action [%poke-to [%test %test-action [%poke 1]]]]
==