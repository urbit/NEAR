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
+$  card  $+(card card:agent:gall)
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
      def  ~(. (default-agent this %|) bowl)
      hc   ~(. +> [bowl ~])
  ++  on-init
    ^-  (quip card _this)
    =^  cards  state  abet:init:hc
    [cards this]
  ::
  ++  on-save
    ^-  vase
    !>(state)
  ::
  ++  on-load
    |=  =vase
    ^-  (quip card _this)
    =^  cards  state  abet:(load:hc vase)
    [cards this]
  ::
  ++  on-poke
    |=  [=mark =vase]
    ^-  (quip card _this)
    =^  cards  state  abet:(poke:hc mark vase)
    [cards this]
  ::
  ++  on-peek  peek:hc
  ::
  ++  on-watch
    |=  =path
    ^-  (quip card _this)
    =^  cards  state  abet:(watch:hc path)
    [cards this]
  ::
  ++  on-agent  
    |=  [=wire =sign:agent:gall]
    ^-  (quip card _this)
    =^  cards  state  abet:(agent:hc wire sign)
    [cards this]
  ++  on-arvo   on-arvo:def
  ++  on-fail   on-fail:def
  ++  on-leave  on-leave:def
  --
|_  [=bowl:gall deck=(list card)]
+*  that  .
++  emit  |=(=card that(deck [card deck]))
++  emil  |=(lac=(list card) that(deck (welp lac deck)))
++  abet  ^-((quip card _state) [(flop deck) state])
::
++  from-self  =(our src):bowl
::
++  init
  ^+  that
  that
::
++  load
  |=  vaz=vase
  ^+  that
  ?>  ?=([%0 *] q.vaz)
  that(state !<(state-0 vaz))
::
++  poke 
  |=  [=mark =vase]
  ^+  that
  ?+  mark  that
    %near-handler-action
  ?>  from-self
  =+  !<(act=action vase)
  ?-  -.act
    %add
  =.  accs  (~(put in accs) +.act)
  give-accs
  ::
    %del
  =.  accs  (~(del in accs) +.act)
  give-accs
  ::
    %poke
  %-  emit
  [%pass /poke-to/[dude.act] %agent [our.bowl dude.act] %poke-as mark.act [%json !>((need json.act))]]
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
  ^+  that
  ?+    path   ~|(bad-watch-path+path !!)
      [%accs ~]  
    ?>  from-self
    give-accs
  ==
::
++  agent 
  |=  [=wire =sign:agent:gall]
  ^+  that
  ?+    wire  ~|(bad-agent-wire+wire !!)
      [%poke-to * ~]
    ?.  ?=(%poke-ack -.sign)  that
    ?~  p.sign  that
    %-  (slog 'Failed to poke' `@t`(scot %tas -.+.wire) ~)
    that
  ==
::
++  give-accs
  %-  emit
  [%give %fact ~[/accs] %near-handler-update !>([%accs accs])]
::
--