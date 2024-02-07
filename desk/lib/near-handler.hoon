/-  *near-handler
/+  etch
|%
++  enjs
=,  enjs:format
  |%
  ++  update-json
  |=  =update
  ^-  json
  ?-  -.update
    %accs  
  (accs +.update)
  ==
  ::
  ++  accs
  |=  accs=(set acc)
  ^-  json 
  %-  en-vase:etch 
    !>  ^-  (list @t) 
    %+  turn  ~(tap in accs)
    |=(=acc `@t`(scot %ux acc))
  ::
  ++  id-data
  |=  data=(map identifier metadata)
  ^-  json 
  %-  en-vase:etch 
    !>  ^-  (list [identifier=[ship=@p id=@t] metadata=[name=@t url=@t]])
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
--
::
++  dejs
!:
=,  dejs:format
  |%
  ++  act
  |=  =json
  ^-  action
  %.  json
  %-  of 
  :~  [%add (se %ux)]
      [%del (se %ux)]
      [%poke poke]   
    ==
  ::
  ::  ::{'poke':{'agent':'test', 'mark':'test-action', 'data':{'poke':1}}}
  ++  poke  
  %-  ot
    :~  [%agent (se %tas)]
        [%mark (se %tas)]
        [%data some]
    ==
  ::
  ++  gateway-act
  |=  =json
  ~&  >  json
  ~&  ((of :~([%install (ot :~([%identifier (ot :~([%ship (se %p)] [%id (se %uv)]))] [%metadata some]))])) json)
    ::~&  ((of :~([%install (ot :~([%identifier (ot :~([%ship (se %p)] [%name some]))] [%metadata some]))])) json)
  ^-  gateway-action 
  %.  json
  %-  of 
  :~  
  [%publish to-metadata]  
  [%install id-data]  
  ==
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
  ==
  --
--