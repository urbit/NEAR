::  oninit %publish ui glob
::  exclude ui-glob from published/installed scry path
::  host ui-glob at /apps/near
::  make sure not to gossip ui-glob
/-  *near-handler
/+  dbug, default-agent, *near-handler, gossip, server, schooner, verb
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
      ui-glob=[identifier glob]
      heard=(map identifier metadata)  
      published=(map identifier metadata)  
      installed=(map identifier glob)
  ==
::
+$  card  $+(card card:agent:gall)
--
::
=|  state-0
=*  state  -
::
::
%+  verb  |
%-  agent:dbug
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
  ++  on-peek   peek:hc
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
  ::for now
  %-  emil
  :~
  [%pass /eyre/connect %arvo %e %connect [~ /apps/near] %near-gateways]
  [%pass /publish-ui %agent [our.bowl %near-gateways] %poke %near-action !>([%publish 'ui-main' url])]
  ==
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
  ~&  mark
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
      ~&  ['publish id' id]
      ?:  =(metadata.act ['ui-main' url])
          =.  ui-glob  [id *glob]
          %+  get-gateway-glob
            metadata.act
          id
      =.  published  (~(put by published) id metadata.act)
      %+  get-gateway-glob
        metadata.act
      id
    ~&  'Alredy globbed and installed'
    that
    ::
      %install  
    %+  get-gateway-glob
      metadata.act
    identifier.act
  ==
==
++  dump  [404 ~ [%plain "404 - Not Found"]]
++  handle-http-request
  |=  [id=@ta inbound-request:eyre]
  ^+  that 
  =/  req=request-line:server  (parse-request-line:server url.request)
  =+  send=(cury response:schooner id)
  ~&  >>>  req
  ?.  authenticated
    %-  emil
    %-  send
    [302 ~ [%login-redirect './apps/near']]
  ?+  method.request  
      %-  emil 
      %-  send  [405 ~ [%stock ~]]
    %'GET'
  ?+  [site ext]:req  
    %-  emil  
    %-  send  [302 ~ [%redirect '../']]
    [[%apps %near ~] *]
    ::=/  new-site  ;;  (list @ta)  /index/html\
    %-  emil
    %+  give-simple-payload:app:server 
      id
    %+  from-glob
      *identifier
    req(site /index/html)
    ::
    [[%apps %near %assets *] *]
    =/  new-site  (weld (slag 2 site.req) (drop ext.req))
    %-  emil
    %+  give-simple-payload:app:server 
      id
    %+  from-glob 
      *identifier
    req(site new-site)
    ::
      [[%apps %near @ @ *] *] ::  /apps/near/ship/id/index/html  /near/~rantul-tobfep-sanpel-fiptev--dollur-dibted-parwel-samzod/0v2.2qs2p.b8227.v71g0.3r0io.714ar/index/html
    ?.  (gte (lent site.req) 5)
      %-  emil
      %-  send  dump
    =/  identifier  :-  (slav %p (snag 2 site.req))
                    (slav %uv (snag 3 site.req))
    ?.  (~(has by installed) identifier) 
      %-  emil
      %-  send  dump
    =/  new-site  
    %+  weld 
      %+  slag  4 
      ;;  (list @ta)  site.req
    %-  drop 
    ext.req
    %-  emil
    %+  give-simple-payload:app:server 
      id
    %+  from-glob 
      identifier
    req(site new-site)
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
  ~&  identifier
  ~&  site.request
  =/  =glob
    ?:  =(identifier [ship=~zod id=0v0])  
    ~&  >   (~(has by +.ui-glob) site.request)
    +.ui-glob
      ?.  (~(has by installed) identifier)  
        ~
  (~(got by installed) identifier)
~&  >>  'glob'
  ?:  =(glob ~)  not-found:gen:server
  =/  requested  ?:  (~(has by glob) site.request)  
                    site.request
                  /index/html
  =/  =mime  (~(got by glob) requested)
  ~&  'got mime'
  =/  mime-type=@t  (rsh 3 (crip <p.mime>)) 
    =;  headers
      [[200 headers] `q.mime]
      :-  content-type+mime-type
      ?:  =(/index/html requested)  ~
      ~[max-1-wk:gen:server]
::  
++  get-gateway-glob
  |=  [data=metadata =identifier] 
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
::
++  agent 
  |=  [=wire =sign:agent:gall]
  ^+  that
  ?+    wire  ~|(bad-agent-wire+wire !!)
      [%publish-ui ~]
    ?+  -.sign  ~|([%unexpected-self-poke-sign -.sign] !!)
        %poke-ack
      ?~  p.sign  
        that
      ~&  'Poke ui failed'
      that
    == 
      ::
      [%~.~ %gossip %gossip ~]
    ?+  -.sign  ~|([%unexpected-gossip-sign -.sign] !!)
        %fact
      =*  mark  p.cage.sign
      =*  vase  q.cage.sign
      ?.  =(%metadata mark)  that
        =+  !<([id=identifier =metadata] vase)
        =.  heard  (~(put by heard) id metadata)
        that
    ==
      [%glob @ @ @ *]
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
        ~&  >>>  ['Thread-failed to glob' (slag 2 `(list @ta)`wire)]
        =/  id    (id-from-wire wire)
        =.  published  (~(del by published) id)
        that
        ::
          %thread-done 
        ~&  'thread done fact got'
        =/  glob  !<(glob q.cage.sign)
        =/  id    (id-from-wire wire)
        :: =/  had=metadata  (~(got by published) id)
        =/  path  ;;  (list @ta)  wire
        =/  got=metadata
          :-  (snag 2 path)
          (snag 3 path)
        :: ?.  =(url.had url.got)
        ::   ~&  >>>  'Glob url mismatch'
        ::   that
        ?:  =(got ['ui-main' url])
          =.  ui-glob  [-.ui-glob glob]
          that
        ~&  >  'Gateway globbed successfully'
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
    ?:  accepted.sign-arvo  
    that
    ~&  ['Failed to bind' path.binding.sign-arvo] 
    that
  ==
++  peek
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  [~ ~]
  ::  
  [%x %heard ~]      ``json+!>((id-data:enjs heard))
  [%x %published ~]  ``json+!>((id-data:enjs published))
  [%x %installed ~]  ``json+!>((id-glob:enjs ~(tap in ~(key by installed))))
  [%x %dbug %state ~]  
  =-  ``noun+!>(-)
  %_  state
      installed
    %-  ~(run by installed)
    |=  =glob
      %-  ~(run by glob)
      |=(=mime mime(q.q 1.337))
      +.ui-glob 
      %-  ~(run by +.ui-glob)
      |=(=mime mime(q.q 1.337))
  ==
==
  ::http{s}://{host}/~/scry/{app}{path}.{mark}
++  url  's3-bucket-url
  --