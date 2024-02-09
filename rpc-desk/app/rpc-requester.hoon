/-  near-rpc
/+  dbug, default-agent
::
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 =provider:near-rpc queue=(set request:near-rpc)]
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
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  [~ ~]
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  `this
::
++  on-agent  
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  `this
::
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
  =.  provider  our.bowl  ::we're our own provider to start (for testing)
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
  ?+    mark  that
      %near-rpc-response
    ?>  =(src.bowl provider)
    ~&  >  'Got response'
    that
    ::
      %near-rpc-action
    ?>  from-self
    =+  !<(act=action:near-rpc vase)
    ?-    -.act
        %change-provider
      =.  provider  provider.act
      that
    ::
        %send-request
      =/  req  [now.bowl content.act]
      =.  queue  (~(put in queue) req)
      %-  emit
      :*  %pass  /request 
          %agent  [provider %rpc-provider] 
          %poke  %near-rpc-ask
          !>(`ask:near-rpc`[%request req])
      ==
    ==
  ==
--