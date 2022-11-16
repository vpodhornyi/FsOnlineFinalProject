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

//    @Transactional(readOnly = true)
//    public User findById(Long id) {
//        return userDao.findById(id).get();
//    }

    @Transactional(readOnly = true)
    public User findByUserTag(String userTag) {
        return userDao.findByUserTag(userTag);
    }

    public boolean updateUserProfile(Long id, UserProfileUpdateRequestDto dto) {
        Optional<User> user = userDao.findById(id);

        String dtoName = dto.getName();
        String dtoBio = dto.getBio();
        String dtoLocation = dto.getLocation();
        String dtoBirth = dto.getBirth();

        if (user.isPresent()) {
            if (dtoName != null && dtoName.length() > 0) {
                user.get().setName(dtoName);
            }
            if (dtoBio != null && dtoBio.length() > 0) {
                user.get().setBio(dtoBio);
            }
            if (dtoLocation != null && dtoLocation.length() > 0) {
                user.get().setLocation(dtoLocation);
            }

            if (dtoBirth != null && dtoBirth.length() > 4) {
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

    public boolean updateUserHeader (Long id, String headerImgUrl) {
        Optional<User> user = userDao.findById(id);

        if (user.isPresent()) {
            user.get().setHeaderImgUrl(headerImgUrl);
            userDao.save(user.get());
            return true;
        }

        return false;
    }

    public boolean updateUserAvatar (Long id, String avatarImgUrl) {
        Optional<User> user = userDao.findById(id);

        if (user.isPresent()) {
            user.get().setAvatarImgUrl(avatarImgUrl);
            userDao.save(user.get());
            return true;
        }

        return false;
    }
}
