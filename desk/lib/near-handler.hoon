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
--