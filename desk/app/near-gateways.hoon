/-  *near-gateways
/+  dbug, default-agent, *near-gateways, gossip, server, schooner, verb
/$  grab-metadata  %noun  %near-metadata
::
|%
::
+$  versioned-state
  $%  state-0
      state-1
  ==
::
+$  state-0
  $:  %0
      ui-glob=[identifier glob]
      heard=(map identifier metadata-0)
      published=(map identifier metadata-0)
      installed=(map identifier glob)
  ==
+$  state-1
  $:  %1
      ui-glob=[identifier glob]
      heard=(map identifier metadata)
      published=(map identifier metadata)
      installed=(map identifier glob)
  ==
::
+$  card  $+(card card:agent:gall)
--
::
=|  state-1
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
++  from-self    =(our src):bowl
++  main-ui-url  'https://0x0.st/XPdF.glob'
::
++  init
  ^+  that
  %-  emil
  :~  :*  %pass
          /eyre/connect
          %arvo
          %e
          %connect
          [~ /apps/near]
          %near-gateways
      ==
      :*  %pass
          /publish-ui
          %agent
          [our.bowl %near-gateways]
          %poke
          %near-action
          !>  ^-  gateway-action
          [%publish 'ui-main' main-ui-url '' '']
      ==
  ==
::
++  load
  |=  vaz=vase
  ^+  that
  =/  old-state
    !<(versioned-state vaz)
  ?-  -.old-state
      %1
    =.  state  old-state
    =.  that
    %-  emit
    :*  %pass
        /publish-ui
        %agent
        [our.bowl %near-gateways]
        %poke
        %near-action
        !>  ^-  gateway-action
        [%publish 'ui-main' main-ui-url '' '']
    ==
    that
  ::
      %0
    =.  state  *state-1
    =.  that
    %-  emit
    :*  %pass
        /publish-ui
        %agent
        [our.bowl %near-gateways]
        %poke
        %near-action
        !>  ^-  gateway-action
        [%publish 'ui-main' main-ui-url '' '']
    ==
    that
  ==
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
    ?~  (find ~[init-metadata.act] ~(val by published))
      =/  id=identifier  [our.bowl (sham eny.bowl)]
      ~&  ['id' id]
      ~&  ['date' now.bowl]
      ~&  ['glob url' url.init-metadata.act]
      ~&  ['about' about.init-metadata.act]
      ~&  ['thumbnail url' thumbnail.init-metadata.act]
      =/  new=metadata
        :*  name.init-metadata.act
            now.bowl
            url.init-metadata.act
            about.init-metadata.act
            thumbnail.init-metadata.act
        ==
      ?:  =(init-metadata.act ['ui-main' main-ui-url '' ''])
          =.  ui-glob  [id *glob]
          %+  get-gateway-glob
            new
          id
      =.  published  (~(put by published) id new)
      %+  get-gateway-glob
        new
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
  ::
      %hide
    ?~  (~(get by heard) identifier.act)
      ~&  >>>  "Haven't heard about {<identifier.act>}"
      that
    =.  heard  (~(del by heard) identifier.act)
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
        now.bowl
        url.data
        (scot %p -.identifier)
        (scot %uv +.identifier)
        thumbnail.data
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
        =*  glob    -.result
        =*  about   +.result
        =/  id    (id-from-wire wire)
        =/  path  ;;  (list @ta)  wire
        =/  got=metadata
          :*  (snag 2 path)             ::  name
              (slav %da (snag 1 path))  ::  date
              (snag 4 path)             ::  glob url
              about                     ::  description
              (snag 7 path)             ::  thumbnail url
          ==
        ?:  =(main-ui-url (snag 4 path))
          =.  ui-glob  [-.ui-glob glob]
          that
        ~&  >  'Gateway globbed successfully'
        =.  installed  (~(put by installed) id glob)
        ?:  (~(has by published) id)
          %-  emil
          :~  %+  invent:gossip
                %metadata
              !>  ^-  [identifier metadata]
              [id got]
              :*  %give
                  %fact
                  [/updates]~
                  %near-update
                  !>([%published id got])
              ==
          ==
        %-  emil
        :~  %+  invent:gossip
              %metadata
            !>  ^-  [identifier metadata]
            [id got]
            :*  %give
                %fact
                [/updates]~
                %near-update
                !>([%installed id got])
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
:-  (slav %p (snag 5 wire))
(slav %uv (snag 6 wire))
::
++  arvo
  |=  [=wire =sign-arvo]
  ^+  that
  ?+  wire
    that
  ::
      [%eyre %connect ~]
    ?.  ?=([%eyre %bound *] sign-arvo)
      that
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
--
