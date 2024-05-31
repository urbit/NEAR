/-  *near-storage
|_  act=storage-action
++  grab
  |%
  ++  noun  storage-action
  ++  json
    =,  dejs:format
    |=  =json
    ^-  storage-action
    %.  json
    %-  of
    :~  [%remove-item (ot [[%key so]]~)]
        [%set-item (ot ~[[%key so] [%val so]])]
    ==
  --
++  grow
  |%
  ++  noun  act
  --
++  grad  %noun
--
