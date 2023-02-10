import React from 'react'

function Intro() {
  return (
    <div className='flex justify-center w-full'>
        <div className='max-w-[400px] md:max-w-[250px] p-8 space-y-4 flex flex-col items-center'>
            <h1>Frekvens app</h1>
            <p className='text-xs italic'>Den app er udviklet for at få et hurtigt overblik over hvilke frekvenser der kan benyttes ved hjælp af din geolokation.</p>
            <p className='text-xs italic'>Alt data er leveret af Energistyrelsen og er frit tilgængeligt via deres hjemmeside.</p>
        </div>
    </div>
  )
}

export default Intro