# tokenMetadataSolana
how to add metadata for FT and NFT on Solana
## 1. Old SPL token program -> Metaplex
doc: https://developers.metaplex.com/token-metadata

It is a program:Token Metadata program. The metadata is in Metadata Account (PDA derived from Mint Account). There are a lot of Token Standard, especially for NFT

The npm package is shown.

The token: https://explorer.solana.com/address/SuRsHWokti5MS1ckLwaqNmD8SqCUnjwamE9L6VitzW9/metadata?cluster=devnet
## 2. SPL Token-2022 program
doc: https://spl.solana.com/token-2022

Mint extensions include metadata and metadata pointer

