/-  *near-handler
/+  dbug, default-agent, *near-handler
::
|%
::
+$  versioned-state
  $%  state-0
  ==
::
+$  state-0 
  $:  %0  
      accs=(set acc)
  ==
::
+$  card  card:agent:gall
--
::
%-  agent:dbug
=|  state-0
=*  state  -
::
^-  agent:gall
::
=<
  |_  =bowl:gall
  +*  this  .
      def   ~(. (default-agent this %|) bowl)
      eng   ~(. +> [bowl ~])
  ++  on-init
    ^-  (quip card _this)
    =^  cards  state  abet:init:eng
    [cards this]
  ::
  ++  on-save
    ^-  vase
    !>(state)
  ::
  ++  on-load
    |=  =vase
    ^-  (quip card _this)
    =^  cards  state  abet:(load:eng vase)
    [cards this]
  ::
  ++  on-poke
    |=  [=mark =vase]
    ^-  (quip card _this)
    =^  cards  state  abet:(poke:eng mark vase)
    [cards this]
  ::
  ++  on-peek  peek:eng
  ::
  ++  on-watch
    |=  =path
    ^-  (quip card _this)
    =^  cards  state  abet:(watch:eng path)
    [cards this]
  ::
  ++  on-agent  on-agent:def
  ++  on-arvo   on-arvo:def
  ++  on-fail   on-fail:def
  ++  on-leave  on-leave:def
  --
|_  [=bowl:gall dek=(list card)]
+*  dat  .
++  emit  |=(=card dat(dek [card dek]))
++  emil  |=(lac=(list card) dat(dek (welp lac dek)))
++  abet  ^-((quip card _state) [(flop dek) state])
::
++  from-self  =(our src):bowl
::
++  init
  ^+  dat
  dat
::
++  load
  |=  vaz=vase
  ^+  dat
  ?>  ?=([%0 *] q.vaz)
  dat(state !<(state-0 vaz))
::
++  poke 
  |=  [=mark =vase]
  ^+  dat
  ?+  mark  dat
    %action
  ?>  from-self
  =+  !<(act=action vase)
  ?-  -.act
    %add
  =.  accs  (~(put in accs) +.act)
  (emit give-accs)
    %del
  =.  accs  (~(del in accs) +.act)
  (emit give-accs)
  ==
==
::
++  peek
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  [~ ~]
    [%x %accs ~]  
  ``near-handler-update+!>([%accs accs])
  ==
::
++  watch
  |=  =path
  ^+  dat
  ?+    path   ~|(bad-watch-path+path !!)
      [%accs ~]  
    ?>  from-self
    (emit give-accs)
  ==
::
++  give-accs
  ^-  card
  [%give %fact ~[/accs] %near-handler-update !>([%accs accs])]
::
--