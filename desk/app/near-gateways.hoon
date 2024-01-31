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
    %+  start-gateway-glob
      %near-handler 
    path.act
    ::
    %install
    :: get and host glob on handle/get at some path/name/
    :: host each path alike payload-from-glob
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
    ::[ext.request-line site.request-line args.request-line]
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
  :: get glob files out to host 
  ~&  >>  [from request]
  =/  charge-update  .^(charge-update:docket %gx /(scot %p our.bowl)/docket/(scot %da now.bowl)/charges/noun)
  ~&  >>  ['suffix' (weld site.request (drop ext.request))]
  ?+  -.charge-update  [404 ~ [%stock ~]]
    %initial
  ~&  (~(get by initial.charge-update) from)
  [200 ~ [%plain "welcome to %near-gateway"]]
  ==
::  
++  start-gateway-glob
|=  [=desk =path]
^+  that 
=/  tid  `@ta`(cat 3 'near-' (scot %uv (sham eny.bowl)))
=/  ta-now  `@ta`(scot %da now.bowl)
=/  arg-vase  !>(`[desk path])
=/  =cage  :-  %spider-start
           !>([~ `tid byk.bowl(r da+now.bowl) %gateway-glob arg-vase])
=.  path  (weld /thread/glob/[ta-now] path)
%-  emil
  :~  [%pass path %agent [our.bowl %spider] %poke cage]
      [%pass path %agent [our.bowl %spider] %watch /thread-result/[tid]]
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
++  agent 
  |=  [=wire =sign:agent:gall]
  ^+  that
  ?+    wire  ~|(bad-agent-wire+wire !!)
      [%~.~ %gossip %gossip ~]
    ?+  -.sign  ~|([%unexpected-gossip-sign -.sign] !!)
        %fact
      =*  mark  p.cage.sign
      =*  vase  q.cage.sign
      ?.  =(%metadata mark)  that
      ::add new gateway to heard 
      ~&  >>  'got fact'
      ~&  >>  !<([id=identifier =metadata] vase)
        =+  !<([id=identifier =metadata] vase)
        =.  heard  (~(put by heard) id metadata)
        that
    ==
    ::
      [%thread %glob @ @ *]
    ?-  -.sign 
        %kick  that
        ?(%poke-ack %watch-ack)
      ?~  p.sign  
          that
      ~&  'Thread failed to start'
      that
      ::
        %fact 
      ?+  p.cage.sign  that
          %thread-fail
        ~&  >>>  ['thread-failed to glob' (slag 2 `(list @ta)`wire)]
        ::add some back up logic?
        that
        ::
          %thread-done 
        =/  hash  !<(hash=@t q.cage.sign)
        =/  data=metadata
          :-  'app-name'  ::name of an app ??
            %-  crip  
            :: here we can add s3 path where it will be stored
            ;:(weld "http://" (trip hash) ".glob")
        =/  id=identifier  [our.bowl `@ud`eny.bowl] ::entropy?
        =.  published  (~(put by published) id data)
        %-  emit
        %+  invent:gossip
          %metadata 
        !>  ^-  [identifier metadata]
        [id data]
     ==
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
    ~&  ['Failed to bind' path.binding.sign-arvo] 
    that
  ==
  --