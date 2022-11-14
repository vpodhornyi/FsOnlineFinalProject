package com.twitterdan.service;

import com.twitterdan.dao.UserDao;
import com.twitterdan.domain.dto.userDto.UserProfileUpdateRequestDto;
import com.twitterdan.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserDao userDao;

    @Transactional(readOnly = true)
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Transactional(readOnly = true)
    public User findById(Long id) {
        return userDao.findById(id).get();
    }

    public boolean updateUserProfile(Long id, UserProfileUpdateRequestDto dto) {
        Optional<User> user = userDao.findById(id);

        String dtoName = dto.getName();
        String dtoBio = dto.getBio();
        String dtoLocation = dto.getLocation();
        String dtoBackground = dto.getHeaderImgUrl();
        String dtoAvatar = dto.getAvatarImgUrl();
        String dtoBirth = dto.getBirth();

        if (user.isPresent()) {
            if (dtoName != null) {
                user.get().setName(dtoName);
            }
            if (dtoBio != null) {
                user.get().setBio(dtoBio);
            }
            if (dtoLocation != null) {
                user.get().setLocation(dtoLocation);
            }
            if (dtoBackground != null) {
                user.get().setHeaderImgUrl(dtoBackground);
            }
            if (dtoAvatar != null) {
                user.get().setAvatarImgUrl(dtoAvatar);
            }

            if (dtoBirth != null) {
                try {
                    DateFormat format = new SimpleDateFormat("d.MM.yyyy");
                    Date date = format.parse(dtoBirth);
                    user.get().setBirthDate(date);
                } catch (ParseException e) {
                    e.printStackTrace();
                }

            }

            userDao.save(user.get());
            return true;
        }

        return false;
    }
}
