/-  *near-gateways
/+  dbug, default-agent, *near-gateways, gossip, server, schooner, verb
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
      [2 %targets %anybody |]
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
  %-  emil
  :~
  [%pass /eyre/connect %arvo %e %connect [~ /apps/near] %near-gateways]
  [%pass /publish-ui %agent [our.bowl %near-gateways] %poke %near-action !>([%publish ['ui-main' url '' ''] ''])]
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
      ~&  ['id' id]
      ~&  ['glob url' url.metadata.act]
      ~&  ['about' about.metadata.act]
      ~&  ['thumbnail url' thumbnail.metadata.act]
      ?:  =(metadata.act ['ui-main' url '' ''])
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
    ::
      %delete
    ?~  (~(get by published) identifier.act)
          ?~  (~(get by installed) identifier.act)
            ~&  >>>  'couldnt find in published or installed gateways'
            that
          ~&  >  'Deleted gateway'
          =.  installed  (~(del by installed) identifier.act)
          that
    ~&  >  'Deleted gateway'
    =.  published  (~(del by published) identifier.act)
    =.  installed  (~(del by installed) identifier.act)
    that
  ==
==
++  dump  [404 ~ [%plain "404 - Not Found"]]
++  handle-http-request
  |=  [id=@ta inbound-request:eyre]
  ^+  that
  =/  req=request-line:server  (parse-request-line:server url.request)
  =+  send=(cury response:schooner id)
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
      [[%apps %near @ @ %gateway *] *]  ::  /apps/near/ship/id/name/index/html
    ?.  (gte (lent site.req) 6)
      %-  emil
      %-  send  dump
    =/  identifier  :-  (slav %p (snag 2 site.req))
                    (slav %uv (snag 3 site.req))
    ?.  (~(has by installed) identifier)
      %-  emil
      %-  send  [404 ~ [%plain "Downoloading glob"]]
    =/  new-site
      %+  weld
        %+  slag  5
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
  =/  =glob
    ?:  =(identifier [ship=~zod id=0v0])
    +.ui-glob
      ?.  (~(has by installed) identifier)
        ~
  (~(got by installed) identifier)
  ?:  =(glob ~)
    not-found:gen:server
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
  |=  [data=metadata =identifier]
  ^+  that
  =/  tid  `@ta`(cat 3 'near-' (scot %uv (sham eny.bowl)))
  =/  ta-now  `@ta`(scot %da now.bowl)
  =/  ted-cage=cage  :-  %glob
                      !>(`[url.data about.data])
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
    ::
      [%updates ~]
    that
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
      ::  ~&  >>>  p.sign
      ~&  >>>  'Poke ui failed'
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
      [%glob @ @ @ @ *]
    ?-  -.sign
        %kick  that
        ?(%poke-ack %watch-ack)
      ?~  p.sign
          that
      ~&  >>>  'Thread failed to start'
      that
      ::
        %fact
      ?+  p.cage.sign  that
          %thread-fail
        ~&  >>>  ['Thread-failed to glob' (snag 2 `(list @t)`wire)]
        ~&  `(list @ta)`wire
        =/  id    (id-from-wire wire)
        =/  url   (snag 3 `(list @t)`wire)
        =.  published  (~(del by published) id)
        ::  case for mirror gateway glob that's been deleted from s3-bucket
        =.  heard  (~(del by heard) id)
        ~&  >>  ['Deleted from heard or published, glob not exist at address' url]
        %-  emit
        [%give %fact [/updates]~ %near-update !>([%failed-glob now.bowl url])]
      ::
          %thread-done
        =/  result  !<([glob @t] q.cage.sign)
        =/  glob    -.result
        =/  id    (id-from-wire wire)
        =/  path  ;;  (list @ta)  wire
        =/  got=metadata
          :*  (snag 2 path)
              (snag 3 path)
              +.result
              ''
          ==
        ?:  =(got ['ui-main' url '' ''])
          =.  ui-glob  [-.ui-glob glob]
          that
        ~&  >  'Gateway globbed successfully'
        =.  installed  (~(put by installed) id glob)
        %-  emil
        :~  %+  invent:gossip
              %metadata
            !>  ^-  [identifier metadata]
            [id got]
            :*  %give
                %fact
                [/updates]~
                %near-update
                !>([%glob id])
            ==
        ==
      ==
    ==
      [%update ~]
    ?+  -.sign  ~|([%unexpected-update-sign -.sign] !!)
    %kick  that
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
  [%x %heard ~]      ``near-scry+!>([%heard heard])
  [%x %published ~]  ``near-scry+!>([%published published])
  [%x %installed ~]  ``near-scry+!>([%installed ~(tap in ~(key by installed))])
  [%x %installed @ ~]  ``near-scry+!>([%find-id (find-id -.+.+.path)])
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
++  find-id
|=  name=@t
^-  identifier
=/  gateway=(list [identifier metadata])
  %+  skim  ~(tap by published)
    |=  [p=identifier q=metadata]
    =(name name.q)
?~  gateway  [~zod 0v0]
-:(rear gateway)
  ::
++  url  'https://0x0.st/XH2S.glob'
  --
