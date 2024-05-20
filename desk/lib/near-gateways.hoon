/-  *near-gateways
/+  etch
|%
++  enjs
  =,  enjs:format
  |%
  ::
  ++  scry-json
  |=  =scry
  ^-  json
  ?-  -.scry
    %heard
  (id-data +.scry)
    %published
  (id-data +.scry)
    %installed
  (id-glob +.scry)
    %find-id
  (id +.scry)
  ==
  ::
  ++  update-json
  |=  =update
  ^-  json
  ?-  -.update
    %installed
  (id-data (my +.update ~))
    %published
  (id-data (my +.update ~))
    %failed-glob
  (err-update +.update)
  ==
  ::
    ++  id-data
    |=  data=(map identifier metadata)
    ^-  json
    %-  en-vase:etch
      !>  ^-  (list [identifier=[ship=@p id=@t] metadata=[name=@t url=@t about=@t thumbnail=@t]])
      %+  turn  ~(tap by data)
      |=  arg=[=identifier =metadata]
      :-  :-  ship=ship.identifier.arg
          id=(scot %uv id.identifier.arg)
        [metadata.arg]
  ::
    ++  id-glob
    |=  data=(list identifier)
    ^-  json
    %-  en-vase:etch
      !>  ^-  (list identifier=[ship=@p id=@t])
      %+  turn  data
      |=  =identifier
      :-  ship.identifier
      (scot %uv id.identifier)
  ::
    ++  id
    |=  =identifier
    ^-  json
    %-  en-vase:etch
    !>  ^-  [ship=@p id=@t]
    :-  ship.identifier
    (scot %uv id.identifier)
  ::
    ++  err-update
    |=  data=[date=@da url=@t]
    ^-  json
    %-  en-vase:etch
    !>  ^-  [date=@da url=@t]
    data
  --
::
++  dejs
!:
=,  dejs:format
  |%
  ::
  ++  gateway-act
  |=  =json
  ^-  gateway-action
  %.  json
  %-  of
  :~
  [%publish to-metadata]
  [%install id-data]
  [%delete to-identifier]
  [%hide to-identifier]
  ==
  ::
    ++  id-data
    %-  ot
    :~  [%identifier to-identifier]
        [%metadata to-metadata]
    ==
  ::
    ++  to-identifier
    %-  ot
    :~  [%ship (se %p)]
        [%id (se %uv)]
    ==
  ::
    ++  to-metadata
    %-  ot
    :~  [%name so]
        [%url so]
        [%about so]
        [%thumbnail so]
    ==
  --
--
