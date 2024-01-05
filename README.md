The NEAR BOS has a thriving ecosystem of developers and an innovative method for composing frontends via components stored on the NEAR blockchain. Urbit can enhance the BOS by acting as a private server that new components can interact with, unlocking decentralized interfaces populated by personal data.

To enable these new components, Urbit Labs is forking the NEAR Social VM and adding a new Urbit object with methods that wrap the @urbit/http-api library.

Right now, Urbit-served frontends can poke and scry any agent on that urbit, rather than being restricted to only agents within the same desk—but this will change with userspace permissions later this year. In order to allow BOS developers to write apps that interact with the entirety of the user's urbit, we're developing the %near-handler agent, which will act as a relay for pokes and scries.
