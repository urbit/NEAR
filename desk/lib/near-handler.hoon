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
  %:  en-vase:etch 
    !>  ^-  (list @t) 
    %+  turn  ~(tap in accs)
    |=(=acc `@t`(scot %ux acc))
  ==
  --
::
++  dejs
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
  --
--