/-  *near-handler, docket
/+  dbug, default-agent, *near-handler, gossip, server, schooner
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
  ++  on-arvo   
    |=  [=wire =sign-arvo]
    ^-  (quip card _this)
    =^  cards  state  abet:(arvo:hc wire sign-arvo)
    [cards this]
  ::
  ++  on-peek   on-peek:def
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
  %-  emit 
  [%pass /eyre/connect %arvo %e %connect [~ /apps/near] %near-gateways]
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
    %handle-http-request
  =+  !<([id=@ta request=inbound-request:eyre] vase)
  (handle-http-request id request)
    %near-action
  ?>  from-self
  =+  !<(act=gateway-action vase)
  ?-  -.act
      %publish
    =/  id=identifier  [our.bowl `@ud`eny.bowl] ::entropy?
    =.  published  (~(put by published) id +.act)
    %-  emit
    %+  invent:gossip
      %metadata 
    !>  ^-  [identifier metadata]
    [id +.act]
    ::
      %install
    ::  get and host glob on handle/get at some path/name/
    ::  where would gateways glob file system will be stored, if in docket.hoon state need to scry(doesn't work, return glob.chad as ~)
    ::  host each path alike payload-from-glob
    =.  installed  (~(put by installed) +.act)
    that
    ::
  ==
==
++  dump  [404 ~ [%plain "404 - Not Found"]]
++  handle-http-request
  |=  [id=@ta inbound-request:eyre]
  ^+  that 
  =/  request-line  (parse-request-line:server url.request)
  ::  %-  emil
  =+  send=(cury response:schooner id)
  ?.  authenticated
    %-  emil
    %-  send
    [302 ~ [%login-redirect './apps/near']]
  ?+  method.request  
      %-  emil 
      %-  send  [405 ~ [%stock ~]]
  ::
    %'GET'
  ?+  [site ext]:request-line  
    %-  emil  
    %-  send  dump
    ::
      [[%apps %near ~] *]
    %-  emil  
    %-  send  [200 ~ [%plain "welcome to %near-gateway"]] ::for now
    ::
      [[%apps %near @ *] *]
    %-  emil
    %-  send
    %+  from-glob 
      (snag 2 site.request-line)  
    request-line(site (slag 2 `(list @ta)`site.request-line))
    ==
  ::
    %'POST'  
  %-  emil
  %-  send  dump
  ==
::
++  from-glob
  |=  [from=@ta request=request-line:server]
  ::  how to get glob files out of docket to host ?
  ::  returns charges.state without glob
  =/  charge-update  .^(charge-update:docket %gx /(scot %p our.bowl)/docket/(scot %da now.bowl)/charges/noun)
  ~&  >>  ['suffix' (weld site.request (drop ext.request))]
  ?+  -.charge-update  [404 ~ [%stock ~]]
    %initial
  ~&  (~(get by initial.charge-update) from)
  [200 ~ [%plain "welcome to %near-gateway"]]
  ==
::  
++  watch 
  |=  =path
  ^+  that
  ?+   path    ~|(bad-watch-path+path !!)
      [%http-response *]
    that
    ::
      [%~.~ %gossip %source ~]
    %-  emil
    %+  turn
      ~(tap by published)
    |=  [=identifier =metadata]
    ^-  card
    [%give %fact ~ %metadata !>([identifier metadata])]
  ==
::
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
        =+  !<([id=identifier =metadata] vase)
        =.  heard  (~(put by heard) id metadata)
        that
    ==
  ==
::
++  arvo 
  |=  [=wire =sign-arvo]
  ^+  that 
  ?+  wire   that
      [%eyre ~]
    ?.  ?=([%eyre %bound *] sign-arvo)  that
    ?:  accepted.sign-arvo  that
    ~&  ['Failde to bind' path.binding.sign-arvo] 
    that
  ==
  --