/-  *near-handler
/+  dbug, default-agent, *near-handler, gossip
/$  grab-metadata  %noun  %near-metadata
::
|%
::
+$  versioned-state
  $%  state-0
  ==
::
+$  state-0 
  $:  %0  
  ::  (map identifier=[ship id] metadata=[name url])
      heard=(map identifier metadata)  
      published=(map identifier metadata)  
      installed=(map identifier metadata)
  ==
::
+$  card  $+(card card:agent:gall)
--
::
=|  state-0
=*  state  -
::
%-  %+  agent:gossip
      [2 %anybody %anybody |]
    %+  ~(put by *(map mark $-(* vase)))
      %metadata
    |=(n=* !>((grab-metadata n)))
::
^-  agent:gall
::
=<
  |_  =bowl:gall
  +*  this  .
      def  ~(. (default-agent this %|) bowl)
      hc   ~(. +> [bowl ~])
  ::
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
  ::
  ++  on-peek   on-peek:def
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
  %near-action
  ?>  from-self
  =+  !<(act=gateway-action vase)
  ?-  -.act
    %publish
  ::  add metadata to published-state 
  ::  send update to gossip
  =/  id=identifier  [our.bowl `@ud`eny.bowl] ::what entropy to use ?
    =.  published  (~(put by published) id +.act)
    %-  emit
    %+  invent:gossip
      %metadata 
      !>  ^-  [identifier metadata]
      [id +.act]
  ==
==
++  watch 
  |=  =path
  ^+  that
  ?+    path    ~|(bad-watch-path+path !!)
    [%~.~ %gossip %source ~]  that
  ==
++  agent 
  |=  [=wire =sign:agent:gall]
  ^+  that
  ?+    wire  ~|(bad-agent-wire+wire !!)
    [%~.~ %gossip %gossip ~]
    ?+    -.sign  ~|([%unexpected-gossip-sign -.sign] !!)
      %fact
      =*  mark  p.cage.sign
      =*  vase  q.cage.sign
      ?.  =(%metadata mark)  that
      ::add new gateway to heard 
        =+  !<([id=identifier =metadata] vase)
        =.  heard  (~(put by heard) id metadata)
        that
    ==
  ==
  --