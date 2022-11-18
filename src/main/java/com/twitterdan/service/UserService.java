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
    private final UserDao userRepository;

    @Transactional(readOnly = true)
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public User findById(Long id) {
        return userRepository.findById(id).get();
    }

    @Transactional(readOnly = true)
    public User findByUserTag(String userTag) {
        return userRepository.findByUserTag(userTag);
    }

    public boolean updateUserProfile(Long id, UserProfileUpdateRequestDto dto) {
        Optional<User> user = userRepository.findById(id);

        String dtoName = dto.getName();
        String dtoBio = dto.getBio();
        String dtoLocation = dto.getLocation();
        String dtoBirth = dto.getBirth();
        String dtoHeaderImgUrl = dto.getHeaderImgUrl();

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

            if (dtoHeaderImgUrl != null && dtoHeaderImgUrl.length() == 0) {
                user.get().setHeaderImgUrl("");
            }

            userRepository.save(user.get());
            return true;
        }

        return false;
    }

    public void updateUserHeader (Long id, String headerImgUrl) {
        Optional<User> user = userRepository.findById(id);

        if (user.isPresent()) {
            user.get().setHeaderImgUrl(headerImgUrl);
            userRepository.save(user.get());
        }

    }

    public void updateUserAvatar (Long id, String avatarImgUrl) {
        Optional<User> user = userRepository.findById(id);

        if (user.isPresent()) {
            user.get().setAvatarImgUrl(avatarImgUrl);
            userRepository.save(user.get());
        }

    }

    public User createNewUser(User user) throws Exception {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new Exception("User already exists!");
        } else {
            return userRepository.save(user);
        }
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public Boolean deleteUserById(Long id) {
        userRepository.deleteById(id);
        return true;
    }

    public User getByUserTag(String userTag) {
        return userRepository.findByUserTag(userTag);
    }

    public User getByEmail(String email) {
        return userRepository.findByUserTag(email);
    }
}
