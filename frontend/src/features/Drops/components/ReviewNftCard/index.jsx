const ReviewNftCard = ({ nft }) => {
  console.log("NFT", nft)
  return (
    <div className='my-6'>
      <div className='text-center my-6'>
        <span><b>Review:</b> {nft.name}</span>
      </div>
      <div className='flex gap-6'>
        <div className='flex w-1/2'>
          <img className='mx-2' width='200' height='200' src='https://ca.slack-edge.com/T02ERR4SW56-U02E26PTXTM-9c36fd83e6d5-512' />
          <img className='mx-2' width='200' height='200' src='https://ca.slack-edge.com/T02ERR4SW56-U02E26PTXTM-9c36fd83e6d5-512' />

        </div>
        <div className='text-xs'>
          <div className='flex flex-col'>
            <b>Fan Ranking points:</b>
            <span>{nft.fan_ranking_points}</span>
          </div>
          <div className='flex flex-col'>
            <b>Description:</b>
            <span>{nft.description}</span>
          </div>
          <div className='flex flex-col'>
            <b>Details:</b>
            <span>Rarity</span>
            <span>Edition of {nft.scarcity}</span>
            <span>Creator</span>
            <span>{nft.creator}</span>
            <span>Blockchain</span>
            <span>Solana</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewNftCard
