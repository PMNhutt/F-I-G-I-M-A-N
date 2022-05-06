import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import Loading from '../Loading/Loading'

function Image({ src }) {


    const [loadedImage, setLoadedImage] = useState(false)

    return (
        <>
            {loadedImage ? null : (
                <Loading />
            )}
            <motion.img
                style={loadedImage ? {} : { display: 'none' }}
                onLoad={() => setLoadedImage(true)}
                src={src} alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            />
        </>

    )
}

export default memo(Image)