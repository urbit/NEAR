# NEAR <> Urbit Playground

This repository is set up with a clone of the [NearSocial/VM](), a simplified clone of [near-everything/viewer]() gateway, and a [bos-workspace]().

In more detail:

- /VM - exposes a VM element `Urbit` for integrating with the [Urbit Http-API](https://developers.urbit.org/guides/additional/http-api-guide)
- /gateway - runs a local React App configured with the local VM for displaying the local widgets in /apps
- /apps - widgets to be served by bos-workspace, to be displayed on the gateway

## Getting Started

To run locally, 

Run the gateway



Make sure there is a yarn link
You should see: URbit connected