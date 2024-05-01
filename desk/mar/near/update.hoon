/-  *near-gateways
/+  *near-gateways
|_   =update
++  grab
  |%
  ++  noun  update
  --
++  grow
  |%
  ++  noun  update
  ++  json
    ?-  -.update
        %installed
      %-  pairs:enjs:format
      :~  ['updateTag' [%s 'installed']]
          ['gateways' (update-json:enjs update)]
      ==
    ::
        %published
      %-  pairs:enjs:format
      :~  ['updateTag' [%s 'published']]
          ['gateways' (update-json:enjs update)]
      ==
    ::
        %failed-glob
      %-  pairs:enjs:format
      :~  ['updateTag' [%s 'failed-glob']]
          ['data' (update-json:enjs update)]
      ==
    ==
  --
++  grad  %noun
--
