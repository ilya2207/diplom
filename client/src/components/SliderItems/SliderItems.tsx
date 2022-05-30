import { Box, useToast } from '@chakra-ui/react'
import CatalogItem from 'pages/ShowCatalog/components/CatalogItem'
import React, { useRef } from 'react'
import { addBasketItem } from 'store/basket/basket.action'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { SwiperSlide } from 'swiper/react'
import { Swiper } from 'swiper/react'
import { IBasketItem } from 'types/basket.types'
import { IDetail } from 'types/detail.types'

interface Props {
  items: IDetail[]
}

const SliderItems: React.FC<Props> = ({ items }) => {
  const swiperRef = useRef<any>(null)

  const isAuth = useAppSelector((state) => state.user.isAuth)

  const dispatch = useAppDispatch()
  const toast = useToast({
    duration: 1000,
    isClosable: true,
    position: 'top-right',
    status: 'success',
  })

  const addToBasketHandler = async (data: IBasketItem) => {
    try {
      toast.closeAll()
      await dispatch(addBasketItem(data)).unwrap()
      toast({
        title: 'Успешно добавлено',
      })
    } catch (error) {
      console.log(error)

      toast({
        title: 'Произошла ошибка. Попробуйте еще раз',
        duration: 3000,
        status: 'error',
      })
    }
  }
  return (
    <Box className="relative mt-2">
      <Swiper
        slidesPerView={4}
        loop={true}
        allowSlideNext={true}
        allowSlidePrev={true}
        autoplay={{
          delay: 3000,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {items &&
          items.map((item, index) => (
            <SwiperSlide key={`${item.id}_${index}`}>
              <Box className="mr-10 ml-10">
                <CatalogItem item={item} basketHandler={addToBasketHandler} isAuth={isAuth} />
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>

      <Box
        className="cursor-pointer p-2 absolute top-1/2 -translate-y-1/2 z-20 -left-6"
        onClick={() => swiperRef.current.slidePrev()}
      >
        <i className="fa-solid fa-chevron-left text-2xl"></i>
      </Box>
      <Box
        className="cursor-pointer p-2 absolute top-1/2 -translate-y-1/2 -right-6 z-20"
        onClick={() => swiperRef.current.slideNext()}
      >
        <i className="fa-solid fa-chevron-right text-2xl"></i>
      </Box>
    </Box>
  )
}

export default SliderItems
