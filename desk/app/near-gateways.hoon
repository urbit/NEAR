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
      installed=(map identifier glob:docket)
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
++  emil  |=(lac=(list card) that(deck (welp (flop lac) deck)))
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
  ::
    %near-action
  ?>  from-self
  =+  !<(act=gateway-action vase)
  ?-  -.act
    ::
      %publish 
    ?~  (find ~[metadata.act] ~(val by published))
      =/  id=identifier  [our.bowl (sham eny.bowl)] 
      =.  published  (~(put by published) id metadata.act)
      %+  get-gateway-glob
        metadata.act
      id
    ~&  'Alredy globbed and installed'
    that
    ::
      %install  ::[%install =identifier =metadata]
    %+  get-gateway-glob
      metadata.act
    identifier.act
  ==
==
++  dump  [404 ~ [%plain "404 - Not Found"]]
++  handle-http-request
  |=  [id=@ta inbound-request:eyre]
  ^+  that 
  =/  request-line  (parse-request-line:server url.request)
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
    %-  send  [302 ~ [%redirect './apps/near']]
    ::
      [[%apps %near ~] *]
    %-  emil  
    %-  send  [200 ~ [%plain "welcome to %near-gateway"]] ::for now
    ::
      [[%apps %near @ @ *] *] 
    =/  new-site  
    %+  weld 
      %+  slag  4 
      ;;  (list @ta)  site.request-line
    %-  drop 
    ext.request-line
      ~&  >  request-line
      ~&  >>  ['site' (weld (slag 4 `(list @ta)`site.request-line) (drop ext.request-line))]
    %-  emil
    %+  give-simple-payload:app:server 
      id
    %+  from-glob 
      :-  (slav %p (snag 2 site.request-line))  ::ship
      (slav %uv (snag 3 site.request-line))     ::id
    request-line(site new-site)
    ==
  ::
    %'POST'  
  %-  emil
  %-  send  dump
  ==
::
++  from-glob
  |=  [identifier=[=ship id=@uvH] request=request-line:server]
  ^-  simple-payload:http
  ~&  (~(has by installed) identifier)
  ?.  (~(has by installed) identifier)  not-found:gen:server
  =/  =glob:docket  (~(got by installed) identifier)
  ::?:  =(suffix /desk/js)
  =/  requested  ?:  (~(has by glob) site.request)  
                    site.request
                  /index/html
  =/  =mime  (~(got by glob) requested)
  =/  mime-type=@t  (rsh 3 (crip <p.mime>)) 
   =;  headers
      [[200 headers] `q.mime]
     :-  content-type+mime-type
     ?:  =(/index/html requested)  ~
     ~[max-1-wk:gen:server]
::  
++  get-gateway-glob
  |=  [data=metadata =identifier]  ::[name=@t url=@t]
  ^+  that 
  =/  tid  `@ta`(cat 3 'near-' (scot %uv (sham eny.bowl)))
  =/  ta-now  `@ta`(scot %da now.bowl)
  =/  ted-cage=cage  :-  %glob  
                      !>(`url.data)
  =/  cage  :-  %spider-start
            !>([~ `tid byk.bowl(r da+now.bowl) ted-cage])
  =/  id-path  
  ;;  (list @ta)
    :~  name.data 
        url.data 
        (scot %p -.identifier) 
        (scot %uv +.identifier)
    ==
  =/  path  `(list @ta)`(weld /glob/[ta-now] id-path)
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
      ~&  >>  'got fact'
      ~&  >>  !<([id=identifier =metadata] vase)
        =+  !<([id=identifier =metadata] vase)
        =.  heard  (~(put by heard) id metadata)
        that
    ==
      [%glob @ @ @ *]
    ?-  -.sign 
        %kick  that
        ?(%poke-ack %watch-ack)
      ?~  p.sign  
          ~&  'Thread started succesfully' 
          that
      ~&  'Thread fail to start'
      that
      ::
        %fact 
      ?+  p.cage.sign  that
          %thread-fail
        ~&  >>>  ['thread-failed to glob' (slag 2 `(list @ta)`wire)]
        =/  id    (id-from-wire wire)
        =.  published  (~(del by published) id)
        that
        ::
          %thread-done 
        =/  glob  !<(glob:docket q.cage.sign)
        =/  id    (id-from-wire wire)
        =/  had=metadata  (~(got by published) id)
        =/  path  ;;  (list @ta)  wire
        =/  got=metadata
          :-  (snag 2 path)
          (snag 3 path)
        ?.  =(url.had url.got)
          ~&  >>>  'glob url mismatch'
          that
        =.  installed  (~(put by installed) id glob)
        %-  emit
        %+  invent:gossip
          %metadata 
        !>  ^-  [identifier metadata]
        [id got]
     ==
    ==
  ==
::
++  id-from-wire
|=  =wire 
^-  identifier 
:-  (slav %p (snag 4 wire))
(slav %uv (snag 5 wire))
::
++  arvo 
  |=  [=wire =sign-arvo]
  ^+  that 
  ?+  wire   that
      [%eyre %connect ~]
    ?.  ?=([%eyre %bound *] sign-arvo)  that
    ?:  accepted.sign-arvo  that
    ~&  ['Failed to bind' path.binding.sign-arvo] 
    that
  ==
  --